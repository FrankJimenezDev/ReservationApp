import { Reserve } from "../../../config/entities/reserves";
import { CreateReserveDto } from "../model/createDto";
import { db } from '../../../config/db/dbconnection';
import { Repository } from "typeorm";
import { select } from "../model/querySelect";
import { RoomsReserve } from "../../../config/entities/rooms_reserve";

export class ReserveService implements Service<Reserve> {
    reserveRepository: Repository<Reserve>;
    roomsReserveRepository: Repository<RoomsReserve>
    constructor() {
        this.reserveRepository = db.getRepository(Reserve)
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

        if (!reserveRoom || reserveRoom.length === 0) {
            throw new Error("Debe enviar al menos un numero de habitacion a reservar");
        }
        //priemro creamos la reserva con los datos del body y los guardamos
        const reserveToCreate = this.reserveRepository.create(body)
        //obtenemos el id de la reserva, nos hara falta para actualizar los datos de la tabla union
        const { reserve_id } = reserveToCreate
        //como puede que debamos guardar varias habitaciones, realizamos un .map a reserveRoom
        //de esta menara guardamos las promesas en un arreglo llamado promises
        //luego hacemos un await Promise.all(promises)
        const promises = reserveRoom.map(async element => {
            const roomsReserveDto = {
                room_id: element,
                reserve_id: reserve_id
            };
            const roomReserveToCreate = this.roomsReserveRepository.create(roomsReserveDto);
            try {
                await this.roomsReserveRepository.save(roomReserveToCreate);
            } catch (error) {
                throw new Error(`La habitación ${element} no existe, intente con otra habitación`);
            }
        });

        await this.reserveRepository.save(reserveToCreate)
        await Promise.all(promises);

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