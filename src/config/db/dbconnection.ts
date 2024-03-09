import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "../entities/users"
import { Reserve } from "../entities/reserves"
import { Room } from "../entities/rooms"
import { ReserveStatus, RoomStatus, UserStatus } from "../entities/status"
import { UserRol } from "../entities/roles"

export const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'user',
    password: 'pass',
    database: 'reservationApp',
    synchronize: true,
    entities: [
        User, Reserve, Room, RoomStatus, ReserveStatus, UserStatus, UserRol
    ],
})
