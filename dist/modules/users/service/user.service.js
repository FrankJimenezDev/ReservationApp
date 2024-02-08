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
            const users = yield users_1.User.find();
            if (!users) {
                throw new Error(`No se encontraron usuarios registrados`);
            }
            return users;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOneBy({
                id
            });
            if (!user) {
                throw new Error(`No existe usuario con el id: ${id}`);
            }
            return user;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, correo, password } = body;
            const user = users_1.User.create({
                name,
                lastname,
                correo,
                password
            });
            yield user.save();
            if (!user) {
                throw new Error(`Error al crear Usuario`);
            }
            return user;
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOneBy({
                id
            });
            if (!user) {
                throw `No existe usuario con el id: ${id}`;
            }
            users_1.User.merge(user, body);
            yield users_1.User.save(user);
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_1.User.findOneBy({
                id
            });
            if (!user) {
                throw `No se encontro usuario con el id: ${id}`;
            }
            if (!user.status) {
                users_1.User.merge(user, {
                    status: true
                });
                yield users_1.User.save(user);
                return user;
            }
            users_1.User.merge(user, { status: false });
            yield users_1.User.save(user);
            return user;
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map