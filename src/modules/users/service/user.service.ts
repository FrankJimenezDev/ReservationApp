import { User } from "../../../config/entities/users";

export class UserService implements Service<User> {
    async getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async getOne(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async create(body: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async update(id: number, body: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

}