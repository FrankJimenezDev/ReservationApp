"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../service/user.service");
const controller_1 = require("../controller/controller");
const routes = (0, express_1.Router)();
const service = new user_service_1.UserService();
routes.get('/', (req, res) => new controller_1.UsersController(service).getAllUsers(res));
routes.get('/');
routes.post('/');
routes.put('/');
routes.delete('/');
exports.default = routes;
//# sourceMappingURL=routes.js.map