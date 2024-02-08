import { User } from "../../../config/entities/users";

export class UserService implements Service<User> {
    async getAll(): Promise<User[]> {

        const users = await User.find()
        if (!users) {
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
            throw `No existe usuario con el id: ${id}`
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
            throw `No se encontro usuario con el id: ${id}`
        }

        if (!user.status) {
            User.merge(user, {
                status: true
            })
            await User.save(user);
            return user;
        }

        User.merge(user, { status: false })
        await User.save(user);
        return user;

    }

}