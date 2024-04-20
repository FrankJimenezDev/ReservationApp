import { Repository } from "typeorm";
import { db } from '../../../config/db/dbconnection';
import { CreateReserveDto } from "../model/createDto";
import { select } from "../model/querySelect";
import { Reserve, Room, RoomsReserve } from "../../../config/entities";
import { UpdateReserveDto } from "../model/updateDto";

export class ReserveService implements Service<Reserve> {
    reserveRepository: Repository<Reserve>;
    roomsReserveRepository: Repository<RoomsReserve>
    roomsRepository: Repository<Room>;
    constructor() {
        this.reserveRepository = db.getRepository(Reserve)
        this.roomsRepository = db.getRepository(Room)
        this.roomsReserveRepository = db.getRepository(RoomsReserve)
    }


    async getAll(): Promise<Reserve[]> {
        throw new Error("Method not implemented.");
    }
    async getOne(reserve_id: string): Promise<Reserve> {

        const query = this.reserveRepository
            .createQueryBuilder('reserve')
            .select(select)
            .leftJoin('reserve.userid', 'user')
            .leftJoin('user.userRole', 'rol')
            .leftJoin('user.userStatus', 'userStatus')
            .leftJoin('reserve.reserveStatus', 'status')
            .leftJoin('reserve.reserveRoom', 'reserveRoom')
            .leftJoin('reserveRoom.room', 'room')
            .leftJoin('room.roomStatus', 'roomStatus')
            .leftJoin('room.currency', 'currency')
            .where('reserve.reserve_id = :id', { id: reserve_id });

        const reserve = await query.getOne();
        if (!reserve) {
            throw new Error(`La reservacion ${reserve_id} no existe`);
        }
        return reserve;
    }

    async create(body: CreateReserveDto, reserveRoom: number[]): Promise<Reserve> {
        //validamos que reserveRoom exista, sea un array y que dicho array no sea vacio
        if (!reserveRoom || reserveRoom.length === 0 || !Array.isArray(reserveRoom)) {
            throw new Error("Debe enviar al menos un número de habitación a reservar y debe ser un array");
        }

        //realizamos la reserva para obtener el id de la misma, es necesario para la tabla union
        const reserveToCreate = this.reserveRepository.create(body);
        const { reserve_id } = reserveToCreate;

        //verificamos que los ids enviados por el ciente sean de habitaciones existentes
        const roomsPromises = reserveRoom.map(async room_id => {
            return await this.roomsRepository.findOneBy({ room_id })
        });

        //lo hacemos con un .map y luego un Promise.all
        const rooms = await Promise.all(roomsPromises);

        //verificamos que no haya un dato nulo dentro del resultado del Promise.all
        if (rooms.includes(null)) {
            throw new Error("Parece que ingresaste un numero de habitacion invalido; recuerda que las habitaciones estan asignadas en estricto orden numerico");
        }

        //si no hay un dato nulo se guarda la reserva
        await this.reserveRepository.save(reserveToCreate)

        //con la reserva creada hacemos un .map con las habitacoines una vez verificadas
        //esto para crear y guardar los datos e la tabla union
        const roomsReservePromises = rooms.map(async element => {
            const dto = {
                room_id: element!.room_id,
                reserve_id: reserve_id
            }
            const reserve = this.roomsReserveRepository.create(dto)
            return await this.roomsReserveRepository.save(reserve)
        })

        //luego realizamos un Promise.all para esperar a que se ejecuten todas las promesas del .map
        await Promise.all(roomsReservePromises)

        //buscamos la reserva que creamos y la retornamos para verificar que se ha realizado correctamente
        const reserve = this.getOne(reserve_id)
        return reserve;

    }

    async update(reserve_id: string, body: UpdateReserveDto): Promise<Reserve> {

        const reserve = await this.reserveRepository.findOneBy({ reserve_id })

        if (!reserve) {
            throw new Error(`No existe una reserva con el id: ${reserve_id}}`);
        }

        this.reserveRepository.merge(reserve, body)
        try {
            await this.reserveRepository.save(reserve)
            return this.getOne(reserve_id)
        } catch (error) {
            throw new Error("Hubo un error al actualizar la reserva");
        }

    }

    async delete(reserve_id: string): Promise<Reserve> {
        const reserve = await this.reserveRepository.findOneBy({ reserve_id })
        if (!reserve) {
            throw new Error(`No existe una reserva con el id: ${reserve_id}}`);
        }

        if (reserve.status_id !== 8) {
            this.reserveRepository.merge(reserve, { status_id: 8 })
            this.reserveRepository.save(reserve)
            return this.getOne(reserve_id)
        }

        this.reserveRepository.merge(reserve, { status_id: 1 })
        this.reserveRepository.save(reserve)
        return this.getOne(reserve_id)
    }

}