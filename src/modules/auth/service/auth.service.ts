import { User } from '../../../config/entities/users';
import { Auth, AuthLogIn } from "../model/auth.interface";
import { RegisterDto } from "../model/register.dto";
import { encrypt } from '../helpers/bcrypt';
import { LoginDto } from "../model/login.dto";
import { compare } from "../helpers/bcrypt"
import { generarJWT } from "../helpers/jwt-generator";

export class AuthService implements Auth<User> {
    async register(body: RegisterDto): Promise<User> {
        const {
            name,
            lastname,
            email,
            rol_id
        } = body

        const password = await encrypt(body.password);

        const user = User.create({
            name,
            lastname,
            email,
            password,
            rol_id
        })

        await user.save();

        if (!user) {
            throw new Error(`Error al crear Usuario`)
        }

        return user;
    }

    async login(body: LoginDto): Promise<AuthLogIn> {
        const { email, password } = body
        const user = await User.findOneBy({
            email
        });

        if (!user) {
            throw new Error('Password or Email incorrect');
        }

        const isSamePassword = await compare(password, user.password!);

        if (!isSamePassword) {
            throw new Error('Password or Email incorrect');
        }

        // Se crea el token
        const token = await generarJWT({
            rol: user.rol_id,
            id: user.user_id,
            status: user.status_id
        });

        const userRelevantData = {
            id: user.user_id,
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            rol: user.rol_id
        }

        return {
            user: userRelevantData,
            token
        }

    }
    googleLogin(): any {
        throw new Error("Method not implemented.");
    }
    facebookLogin(): any {
        throw new Error("Method not implemented.");
    }
    xLogin(): any {
        throw new Error("Method not implemented.");
    }

}


