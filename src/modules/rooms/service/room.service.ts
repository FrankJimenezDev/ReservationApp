import { Room } from "../../../config/entities/rooms";

export class RoomService implements Service<Room> {
    async getAll(): Promise<Room[]> {
        const rooms = await Room.find()
        if (rooms.length === 0) {
            throw new Error(`No se encontraron usuarios registrados`)
        }
        return rooms;
    }
    async getOne(id: string): Promise<Room> {

        const room = await Room.findOneBy({
            id
        });

        if (!room) {
            throw new Error(`La habitacion ${id} no existe`);
        }

        return room;

    }

    async create(body: Room): Promise<Room> {
        const {
            id,
            size,
            status,
            price,
        } = body;

        const searchRoom = await Room.findOneBy({
            id
        })

        if (searchRoom) {
            throw new Error (`Ya se ha resgistrado esta habitacion`)
        }

        const room = Room.create({
            id,
            size,
            status,
            price
        })

        await Room.save(room)

        if (!room) {
            throw new Error(`Error al crear la habitacion`)
        }

        return room;
    }

    async update(id: string, body: Room): Promise<Room> {
        const room = await Room.findOneBy({
            id
        });

        if (!room) {
            throw new Error(`La habitacion ${id} no existe`);
        }

        Room.merge(room, body)
        await Room.save(room)
        return room
    }

    async delete(id: string): Promise<Room> {

        const room = await Room.findOneBy({
            id
        });

        if (!room) {
            throw new Error(`La habitacion ${id} no existe`);
        }

        if (!room.status) {
            Room.merge(room, {
                status: 1
            })
            await Room.save(room);
            return room;
        }

        Room.merge(room, { status: 0 })
        await Room.save(room);
        return room;
    }

}