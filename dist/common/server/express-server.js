"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("../../modules/users/routes/routes"));
const dbconnection_1 = require("../../config/db/dbconnection");
class ExpressServer {
    constructor() {
        this.path = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT);
        this.db();
        this.middlewares();
        this.routes();
    }
    db() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbconnection_1.db.initialize();
                console.log(`Data Base Initialized`);
            }
            catch (error) {
                console.log(`Data Base Not Initialized`);
                console.error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
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