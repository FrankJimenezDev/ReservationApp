import { User } from "../../../config/entities/users";

export class UserService implements Service<User> {
    async getAllByRol?(rol: number): Promise<Array<User>> {
        throw new Error("Method not implemented.");
    }
    async getAllByStatus(status_id: number): Promise<Array<User>> {
        const users = await User.find({
            where: {status_id}
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
    async getOne(user_id: string): Promise<User> {

        const user = await User.findOneBy({
            user_id
        });

        if (!user) {
            throw new Error(`No existe usuario con el id: ${user_id}`)
        }

        return user;

    }

    async update(user_id: string, body: User): Promise<User> {

        const user = await User.findOneBy({
            user_id
        })

        if (!user) {
            throw new Error (`No existe usuario con el id: ${user_id}`);
        }

        User.merge(user, body)
        await User.save(user);
        return user;
    }

    async delete(user_id: string): Promise<User> {

        const user = await User.findOneBy({
            user_id
        })

        if (!user) {
            throw new Error(`No se encontro usuario con el id: ${user_id}`);
        }

        if (!user.status_id) {
            User.merge(user, {
                status_id: 1
            })
            await User.save(user);
            return user;
        }

        User.merge(user, { status_id: 0 })
        await User.save(user);
        return user;

    }

}