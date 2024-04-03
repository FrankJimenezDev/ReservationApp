import { Room } from "../../../config/entities/rooms";

export class RoomService implements Service<Room> {
    getAllByStatus(status: number): Promise<Room[]> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Room[]> {
        const rooms = await Room.find()
        if (rooms.length === 0) {
            throw new Error(`No se encontraron usuarios registrados`)
        }
        return rooms;
    }
    async getOne(room_id: string): Promise<Room> {

        const room = await Room.findOneBy({
            room_id
        });

        if (!room) {
            throw new Error(`La habitacion ${room_id} no existe`);
        }

        return room;

    }

    async create(body: Room): Promise<Room> {
        const {
            room_id,
            size,
            status_id,
            price,
            currency_id
        } = body;

        const searchRoom = await Room.findOneBy({
            room_id
        })

        if (searchRoom) {
            throw new Error (`Ya se ha resgistrado esta habitacion`)
        }

        const room = Room.create({
            room_id,
            size,
            status_id,
            price,
            currency_id
        })

        await Room.save(room)

        if (!room) {
            throw new Error(`Error al crear la habitacion`)
        }

        return room;
    }

    async update(room_id: string, body: Room): Promise<Room> {
        const room = await Room.findOneBy({
            room_id
        });

        if (!room) {
            throw new Error(`La habitacion ${room_id} no existe`);
        }

        Room.merge(room, body)
        await Room.save(room)
        return room
    }

    async delete(room_id: string): Promise<Room> {

        const room = await Room.findOneBy({
            room_id
        });

        if (!room) {
            throw new Error(`La habitacion ${room_id} no existe`);
        }

        if (!room.status_id) {
            Room.merge(room, {
                status_id: 1
            })
            await Room.save(room);
            return room;
        }

        Room.merge(room, { status_id: 0 })
        await Room.save(room);
        return room;
    }

}