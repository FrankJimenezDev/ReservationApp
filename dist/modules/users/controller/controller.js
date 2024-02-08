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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
class UsersController {
    constructor(service) {
        this.service = service;
    }
    getAllUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.getAll();
                if (!result.length) {
                    res.status(200).json({
                        success: true,
                        msg: `No se encontraron usuarios registrados`
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    result
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error.message
                });
            }
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