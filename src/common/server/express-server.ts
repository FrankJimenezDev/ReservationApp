import express, { Application } from "express";
import cookieParser from "cookie-parser"
import "dotenv/config"
import cors from "cors"
import users from "../../modules/users/routes/routes"
import auth from "../../modules/auth/routes/routes"
import { db } from "../../config/db/dbconnection";

export class ExpressServer {
    private app: Application;
    private port: number;
    private path = {
        users: '/api/users',
        auth: '/api/auth'
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
        this.app.use(cookieParser())
    }

    routes() {
        this.app.use(this.path.users, users);
        this.app.use(this.path.auth, auth);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Running on: ${this.port}`);
        })
    }

}