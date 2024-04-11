import { Reserve } from "../../../config/entities/reserves";
import { CreateReserveDto } from "../model/createDto";
import { db } from '../../../config/db/dbconnection';
import { Repository } from "typeorm";
import { select } from "../model/querySelect";
import { RoomsReserve } from "../../../config/entities/rooms_reserve";

export class ReserveService implements Service<Reserve> {
    reserveRepository: Repository<Reserve>;
    roomsReserveRepository : Repository<RoomsReserve>
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

    async create(body: CreateReserveDto): Promise<Reserve> {

        // const { reserve_id } = body
        const reserveToCreate = this.reserveRepository.create(body)
        await this.reserveRepository.save(reserveToCreate)

        const reserve = this.getOne(reserveToCreate.reserve_id)
        return reserve;

    }

    async update(id: string, body: Reserve): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }

}