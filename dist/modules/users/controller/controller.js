"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(service) {
        this.service = service;
    }
    getAllUsers(res) {
        const result = this.service.getAll();
        res.json({
            result
        });
    }
    getOneUsers(req, res) {
    }
    createUser(req, res) {
    }
    updateUser(req, res) {
    }
    deleteUsers(req, res) {
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=controller.js.map