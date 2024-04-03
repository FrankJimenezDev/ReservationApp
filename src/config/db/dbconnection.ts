import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "../entities/users"
import { Reserve } from "../entities/reserves"
import { Room } from "../entities/rooms"
import { Status } from "../entities/status"
import { Roles } from "../entities/roles"
import { Currency } from "../entities/currency"
import { RoomsReserve } from "../entities/rooms_reserve"

export const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'root',
    password: '123456',
    database: 'reservationApp',
    synchronize: true,
    entities: [
        User, Reserve, Room, Status, Roles, Currency, RoomsReserve
    ],
})
