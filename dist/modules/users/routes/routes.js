"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_1 = require("../service/user.service");
const controller_1 = require("../controller/controller");
const routes = (0, express_1.Router)();
const service = new user_service_1.UserService();
routes.get('/', (req, res) => new controller_1.UsersController(service).getAllUsers(res));
routes.get('/:id', (req, res) => new controller_1.UsersController(service).getOneUsers(req, res));
routes.post('/', (req, res) => new controller_1.UsersController(service).createUser(req, res));
routes.put('/:id', (req, res) => new controller_1.UsersController(service).updateUser(req, res));
routes.delete('/:id', (req, res) => new controller_1.UsersController(service).deleteUsers(req, res));
exports.default = routes;
//# sourceMappingURL=routes.js.map