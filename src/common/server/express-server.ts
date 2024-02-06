import express, { Application } from "express";
import "dotenv/config"
import cors from "cors"
import users from "../../modules/users/routes/routes"
import { db } from "../../config/db/dbconnection";

export class ExpressServer {
    private app: Application;
    private port: number;
    private path = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT)

        this.db();
        this.middlewares();
        this.routes();
    }

    async db() {
        try {
            await db.initialize();
            console.log(`Data Base Initialized`);
        } catch (error) {
            console.log(`Data Base Not Initialized`);
            console.error(error);
        }
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.path.users, users);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Running on: ${this.port}`);
        })
    }

}