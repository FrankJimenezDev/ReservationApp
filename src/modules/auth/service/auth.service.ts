import { User } from "../../../config/entities/users";
import { Auth } from "../model/auth.interface";


export class AuthService implements Auth<User> {
    async register(body: User): Promise<User> {
        const {
            name,
            lastname,
            email,
            password
        } = body

        const user = User.create({
            name,
            lastname,
            email,
            password
        })

        await user.save();

        if (!user) {
            throw new Error(`Error al crear Usuario`)
        }

        return user;
    }
    login(): void {
        throw new Error("Method not implemented.");
    }
    googleLogin(): void {
        throw new Error("Method not implemented.");
    }
    facebookLogin(): void {
        throw new Error("Method not implemented.");
    }
    xLogin(): void {
        throw new Error("Method not implemented.");
    }

}