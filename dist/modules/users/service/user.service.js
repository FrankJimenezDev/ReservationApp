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
exports.UserService = void 0;
const users_1 = require("../../../config/entities/users");
class UserService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.find();
            return user;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOneBy({
                id
            });
            if (!user) {
                throw new Error(`No existe usuario con el id ${id}`);
            }
            return user;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOneBy({
                id
            });
            if (!user) {
                throw new Error(`No existe usuario con el id ${id}`);
            }
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOneBy({
                id
            });
            if (!user) {
                throw new Error(`No existe usuario con el id ${id}`);
            }
            ;
            return user;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map