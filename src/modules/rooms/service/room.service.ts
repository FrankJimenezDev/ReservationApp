import { Repository } from "typeorm";
import { db } from "../../../config/db/dbconnection";
import { select } from "../model/querySelect";
import { CreateRoomDto } from "../model/createDto";
import { UpdateRoomDto } from "../model/updateDto";
import { Room } from "../../../config/entities";
import { GetAllParams, Service } from "../../../common/interfaces/services";

export class RoomService implements Service<Room> {

    //creamos un repository, lo hacemos desde el constructor ya que lo usaremos en todos los metodos
    //de esta forma nos ahorramos escribir mas codigo
    roomRepository: Repository<Room>;
    constructor() {
        this.roomRepository = db.getRepository(Room)
    }

    async getAll(params: GetAllParams): Promise<Room[]> {

        const { status } = params;
        //ejecutamos la query con createQueryBuilder de typeORM: en .selec() van los campos
        //en este caso los importamos de ./mode/querySelect.ts para mas comodidad
        const query = this.roomRepository
            .createQueryBuilder('room')
            .select(select)
            .leftJoinAndSelect('room.currency', 'currency')
            .leftJoinAndSelect('room.roomStatus', 'status')

        if (status !== undefined) {
            query.andWhere('room.roomStatus = :status', { status: status });
        }

        const rooms = await query.getMany();
        if (rooms.length === 0 && !status) {
            throw new Error(`No se encontraron habitaciones registradas`)
        } else if (rooms.length === 0 && status) {
            throw new Error(`No se encontraron habitaciones con el status que solicita`)
        }
        return rooms
    }

    async getOne(room_id: number): Promise<Room> {

        const query = this.roomRepository
            .createQueryBuilder('room')
            .select(select)
            .leftJoinAndSelect('room.currency', 'currency')
            .leftJoinAndSelect('room.roomStatus', 'status')
            .where('room.room_id = :id', { id: room_id })

        const room = await query.getOne();
        if (!room) {
            throw new Error(`La habitacion ${room_id} no existe`);
        }
        return room;
    }

    async create(body: CreateRoomDto): Promise<Room> {
        const { room_id } = body;

        const searchRoom = await this.roomRepository.findOneBy({ room_id })
        if (searchRoom) {
            throw new Error(`Ya existe una habitacion con el id: ${room_id}`)
        }

        const roomToCreate = this.roomRepository.create(body)
        await this.roomRepository.save(roomToCreate)
        return this.getOne(room_id)
    }

    async update(room_id: number, body: UpdateRoomDto): Promise<Room> {

        const room = await this.getOne(room_id)
        this.roomRepository.merge(room, body)
        await this.roomRepository.save(room)
        return this.getOne(room_id)

    }

    async delete(room_id: number): Promise<Room> {

        const room = await this.getOne(room_id)

        if (room.status_id !== 7) {
            this.roomRepository.merge(room, { status_id: 1 })
            await this.roomRepository.save(room);
            return this.getOne(room_id);
        }

        this.roomRepository.merge(room, { status_id: 0 })
        await this.roomRepository.save(room);
        return this.getOne(room_id);
    }

}