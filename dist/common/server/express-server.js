"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("../../modules/users/routes/routes"));
class ExpressServer {
    constructor() {
        this.path = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT);
    }
    db() {
    }
    middlewares() {
    }
    routes() {
        this.app.use(this.path.users, routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Running on: ${this.port}`);
        });
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=express-server.js.map