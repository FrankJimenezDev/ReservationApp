import { DataSource } from "typeorm"
import "reflect-metadata"
import { User, Reserve, Room, Status, Roles, Currency, RoomsReserve } from "../entities";


export const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    entities: [
        User, Reserve, Room, Status, Roles, Currency, RoomsReserve
    ],
})
