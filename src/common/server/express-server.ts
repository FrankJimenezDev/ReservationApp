import express, { Application } from "express";

export class ExpressServer {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT)
    }

    db() {

    }
    middlewares() {

    }
    routes() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Running on: ${this.port}`);
        })
    }

}