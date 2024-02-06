import { DataSource } from "typeorm"
import "reflect-metadata"
import { User } from "../entities/users"

export const db = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'user',
    password: 'pass',
    database: 'reservationApp',
    synchronize: true,
    entities: [User],
})
