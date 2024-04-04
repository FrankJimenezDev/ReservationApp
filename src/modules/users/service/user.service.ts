import { User } from "../../../config/entities/users";

export class UserService implements Service<User> {

    async getAll(status? : number, rol? : number): Promise<User[]> {

        const query = User
        .createQueryBuilder('user')
        .select([
            'user.user_id',
            'user.name',
            'user.lastname',
            'user.email',
            'roles.role_name',
            'status.status_name',
            'user.createdAt',
            'user.updatedAt'
        ])
        .leftJoinAndSelect('user.userRole', 'roles')
        .leftJoinAndSelect('user.userStatus', 'status')

        if (status !== undefined) {
            query.andWhere('user.status_id = :status', { status: status });
        }
        if (rol !== undefined) {
            query.andWhere('user.rol_id = :rol', { rol: rol });
        }        
        const users = await query.getMany();
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

        if (user.status_id !== 7) {
            User.merge(user, {
                status_id: 7
            })
            await User.save(user);
            return user;
        }

        User.merge(user, { status_id: 1 })
        await User.save(user);
        return user;

    }

}