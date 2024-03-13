import { User } from "../../../config/entities/users";

export class UserService implements Service<User> {
    async getAllByRol?(rol: number): Promise<Array<User>> {
        throw new Error("Method not implemented.");
    }
    async getAllByStatus(status: number): Promise<Array<User>> {
        const users = await User.find({
            where: status
        })
        if (users.length === 0) {
            throw new Error(`No se encontraron usuarios registrados`)
        }
        return users
    }
    async getAll(): Promise<User[]> {

        const users = await User.find()
        if (users.length === 0) {
            throw new Error(`No se encontraron usuarios registrados`)
        }
        return users

    }
    async getOne(id: string): Promise<User> {

        const user = await User.findOneBy({
            id
        });

        if (!user) {
            throw new Error(`No existe usuario con el id: ${id}`)
        }

        return user;

    }

    async update(id: string, body: User): Promise<User> {

        const user = await User.findOneBy({
            id
        })

        if (!user) {
            throw new Error (`No existe usuario con el id: ${id}`);
        }

        User.merge(user, body)
        await User.save(user);
        return user;
    }

    async delete(id: string): Promise<User> {

        const user = await User.findOneBy({
            id
        })

        if (!user) {
            throw new Error(`No se encontro usuario con el id: ${id}`);
        }

        if (!user.status) {
            User.merge(user, {
                status: 1
            })
            await User.save(user);
            return user;
        }

        User.merge(user, { status: 0 })
        await User.save(user);
        return user;

    }

}