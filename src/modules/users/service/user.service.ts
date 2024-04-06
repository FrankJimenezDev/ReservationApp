import { User } from "../../../config/entities/users";
import { UpdateUserDto } from "../model/updateDto";
import { db } from "../../../config/db/dbconnection";
import { encrypt } from "../../auth/helpers/bcrypt";
import { select } from "../model/querySelect";
import { Repository } from "typeorm";

export class UserService implements Service<User> {
    //creamos un repository 
    userRepository: Repository<User>;
    constructor() {
        this.userRepository = db.getRepository(User)
    }

    async getAll(status?: number, rol?: number): Promise<User[]> {
        //ejecutamos la query con createQueryBuilder de typeORM: en .selec() van los campos
        //en este caso los importamos de ./mode/querySelect.ts para mas comodidad
        const query = this.userRepository
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
        if (users.length === 0) {
            throw new Error(`No se encontraron usuarios registrados con sus criterios de busqueda`)
        }
        return users
    }

    async getOne(user_id: string): Promise<User> {
        //ejecutamos la query con createQueryBuilder de typeORM: en .selec() van los campos
        //en este caso los importamos de ./mode/querySelect.ts para mas comodidad
        const query = this.userRepository
            .createQueryBuilder('user')
            .select(select)
            .leftJoinAndSelect('user.userRole', 'roles')
            .leftJoinAndSelect('user.userStatus', 'status')
            .where('user.user_id = :id', { id: user_id })

        const user = await query.getOne()
        if (!user) {
            throw new Error(`No se encontro usuario con el id: ${user_id}`)
        }
        return user;
    }

    async update(user_id: string, body: UpdateUserDto): Promise<User> {

        const userToUpdate = await this.getOne(user_id)
        if (body.password) {
            const password = await encrypt(body.password);
            body.password = password
        }
        this.userRepository.merge(userToUpdate, body)
        await this.userRepository.save(userToUpdate);
        return this.getOne(user_id);
    }

    async delete(user_id: string): Promise<User> {

        const userToDelete = await this.getOne(user_id);

        if (userToDelete.status_id !== 7) {
            this.userRepository.merge(userToDelete, { status_id: 7 })
            await this.userRepository.save(userToDelete);
            return this.getOne(user_id);
        }

        this.userRepository.merge(userToDelete, { status_id: 1 })
        await this.userRepository.save(userToDelete);
        return this.getOne(user_id);
    }
}