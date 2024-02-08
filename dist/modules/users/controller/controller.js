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
                res.status(200).json({
                    success: true,
                    result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({
                        success: false,
                        error: error.message
                    });
                }
                else {
                    // Handle unexpected errors with status 500
                    console.error('Unexpected error:', error);
                    res.status(500).json({
                        success: false,
                        error: 'Internal Server Error'
                    });
                }
            }
        });
    }
    getOneUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield this.service.getOne(id);
                res.status(200).json({
                    success: true,
                    result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({
                        success: false,
                        error: error.message
                    });
                }
                else {
                    // Handle unexpected errors with status 500
                    console.error('Unexpected error:', error);
                    res.status(500).json({
                        success: false,
                        error: 'Internal Server Error'
                    });
                }
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            try {
                const result = yield this.service.create(body);
                res.status(200).json({
                    success: true,
                    result
                });
            }
            catch (error) {
                res.json({
                    success: false,
                    error: error.message
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const result = yield this.service.update(id, body);
                res.status(200).json({
                    success: true,
                    result
                });
            }
            catch (error) {
                res.json({
                    success: false,
                    error: error.message
                });
            }
        });
    }
    deleteUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.service.delete(req.params.id);
                res.status(200).json({
                    success: true,
                    result
                });
            }
            catch (error) {
                res.json({
                    success: false,
                    error: error.message
                });
            }
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=controller.js.map