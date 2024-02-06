"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const users_1 = require("../entities/users");
exports.db = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: 'user',
    password: 'pass',
    database: 'reservationApp',
    synchronize: true,
    entities: [users_1.User],
});
//# sourceMappingURL=dbconnection.js.map