import express, { Application } from "express";
import "dotenv/config"
import users from "../../modules/users/routes/routes"

export class ExpressServer {
    private app: Application;
    private port: number;
    private path = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT)
    }

    db() {

    }

    middlewares() {

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