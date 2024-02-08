import { User } from "../../../config/entities/users";

export class UserService implements Service<User> {
    async getAll(): Promise<User[]> {
        const users = await User.find()
        return users
    }
    async getOne(id: string): Promise<User> {
        const user = await User.findOneBy({
            id
        });
        if (!user) {
            throw new Error(`No existe usuario con el id ${id}`)
        }
        return user;
    }
    async create(body: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async update(id: string, body: User): Promise<User> {
        const user = await User.findOneBy({
            id
        });
        if (!user) {
            throw new Error(`No existe usuario con el id ${id}`)
        }
        return user;
    }
    async delete(id: string): Promise<User> {
        const user = await User.findOneBy({
            id
        });
        if (!user) {
            throw new Error(`No existe usuario con el id ${id}`)
        };
        return user;
    }

}