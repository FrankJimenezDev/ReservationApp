import { Room } from "../../../config/entities/rooms";

class RoomService implements Service<Room> {
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

    async create?(body: Room): Promise<Room> {
        const {
            id,
            size,
            status,
            price,
        } = body;

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
                status: true
            })
            await Room.save(room);
            return room;
        }

        Room.merge(room, { status: false })
        await Room.save(room);
        return room;
    }

}