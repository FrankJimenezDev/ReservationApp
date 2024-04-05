import { User } from "../../../config/entities/users";
import { UpdateUserDto } from "../model/updateDto";
import { db } from "../../../config/db/dbconnection";
import { encrypt } from "../../auth/helpers/bcrypt";
import { select } from "../model/querySelect";

export class UserService implements Service<User> {

    async getAll(status?: number, rol?: number): Promise<User[]> {

        const userRepository = db.getRepository(User)

        const query = userRepository
            .createQueryBuilder('user')
            .select(select)
            .leftJoinAndSelect('user.userRole', 'roles')
            .leftJoinAndSelect('user.userStatus', 'status')

        if (status !== undefined) {
            query.andWhere('user.status_id = :status', { status: status });
        }
        if (rol !== undefined) {
            query.andWhere('user.role_id = :rol', { rol: rol });
        }
        const users = await query.getMany();
        return users

    }

    async getOne(user_id: string): Promise<User> {

        const userRepository = db.getRepository(User)

        const query = userRepository
            .createQueryBuilder('user')
            .select(select)
            .leftJoinAndSelect('user.userRole', 'roles')
            .leftJoinAndSelect('user.userStatus', 'status')
            .where('user.user_id = :id', { id: user_id })

        const user = await query.getOneOrFail()
        return user;
    }

    async update(user_id: string, body: UpdateUserDto): Promise<User> {

        const userRepository = db.getRepository(User)

        const userToUpdate = await userRepository.findOneBy({
            user_id
        })
        if (!userToUpdate) {
            throw new Error(`No existe usuario con el id: ${user_id}`);
        }
        if (body.password) {
            const password = await encrypt(body.password);
            body.password = password
        }
        userRepository.merge(userToUpdate, body)
        await User.save(userToUpdate);

        const query = userRepository
            .createQueryBuilder('user')
            .select(select)
            .leftJoinAndSelect('user.userRole', 'roles')
            .leftJoinAndSelect('user.userStatus', 'status')
            .where('user.user_id = :id', { id: user_id })

        const user = await query.getOneOrFail()
        return user;
    }

    async delete(user_id: string): Promise<User> {

        const userRepository = db.getRepository(User)

        const userToDelete = await userRepository.findOneBy({
            user_id
        })

        if (!userToDelete) {
            throw new Error(`No se encontro usuario con el id: ${user_id}`);
        }

        if (userToDelete.status_id !== 7) {
            User.merge(userToDelete, {
                status_id: 7
            })

            await User.save(userToDelete);
            const query = userRepository
                .createQueryBuilder('user')
                .select(select)
                .leftJoinAndSelect('user.userRole', 'roles')
                .leftJoinAndSelect('user.userStatus', 'status')
                .where('user.user_id = :id', { id: user_id })

            const user = await query.getOneOrFail()
            return user;
        }

        User.merge(userToDelete, { status_id: 1 })
        await User.save(userToDelete);

        const query = userRepository
            .createQueryBuilder('user')
            .select(select)
            .leftJoinAndSelect('user.userRole', 'roles')
            .leftJoinAndSelect('user.userStatus', 'status')
            .where('user.user_id = :id', { id: user_id })

        const user = await query.getOneOrFail()
        return user;

    }

}