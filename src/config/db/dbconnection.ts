import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "../entities/users"
import { Reserve } from "../entities/reserves"
import { Room } from "../entities/rooms"

export const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'user',
    password: 'pass',
    database: 'reservationApp',
    synchronize: true,
    entities: [User, Reserve, Room],
})
