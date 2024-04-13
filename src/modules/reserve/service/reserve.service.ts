import { Reserve } from "../../../config/entities/reserves";
import { CreateReserveDto } from "../model/createDto";
import { db } from '../../../config/db/dbconnection';
import { Repository } from "typeorm";
import { select } from "../model/querySelect";
import { RoomsReserve } from "../../../config/entities/rooms_reserve";
import { Room } from "../../../config/entities/rooms";

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
            throw new Error(`La habitacion ${reserve_id} no existe`);
        }
        return reserve;
    }

    async create(body: CreateReserveDto, reserveRoom: number[]): Promise<Reserve> {
        //validamos que reserveRoom exista, sea un array y que dicho array no sea vacio
        if (!reserveRoom || reserveRoom.length === 0 || !Array.isArray(reserveRoom)) {
            throw new Error("Debe enviar al menos un número de habitación a reservar y debe ser un array");
        }

        //reamos la reserva para obtener el id de la misma, es necesario para la tabla union
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

    async update(id: string, body: Reserve): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }

}