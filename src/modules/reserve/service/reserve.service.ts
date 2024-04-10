import { Reserve } from "../../../config/entities/reserves";
import { CreateReserveDto } from "../model/createDto";
import { db } from '../../../config/db/dbconnection';
import { Repository } from "typeorm";
import { select } from "../model/querySelect";

export class ReserveService implements Service<Reserve> {
    reserveRepository: Repository<Reserve>;

    constructor() {
        this.reserveRepository = db.getRepository(Reserve)
    }


    async getAll(): Promise<Reserve[]> {
        throw new Error("Method not implemented.");
    }
    async getOne(reserve_id: string): Promise<Reserve> {

        const query = this.reserveRepository
            .createQueryBuilder('reserve')
            .select(select)
            .leftJoin('reserve.userid', 'user')
            .leftJoinAndSelect('user.userRole', 'rol')
            .leftJoinAndSelect('user.userStatus', 'userStatus')
            .leftJoinAndSelect('reserve.reserveStatus', 'status')
            .leftJoinAndSelect('reserve.reserveRoom', 'reserveRoom')
            .leftJoinAndSelect('reserveRoom.room', 'room')
            .where('reserve.reserve_id = :id', { id: reserve_id });

        const reserve = await query.getOne();
        if (!reserve) {
            throw new Error(`La habitacion ${reserve_id} no existe`);
        }
        return reserve;
    }

    async create(body: CreateReserveDto): Promise<Reserve> {

        const { user_id } = body
        const reserveToCreate = this.reserveRepository.create(body)
        await this.reserveRepository.save(reserveToCreate)
        const reserve = this.getOne(user_id)
        return reserve;

    }

    async update(id: string, body: Reserve): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<Reserve> {
        throw new Error("Method not implemented.");
    }

}