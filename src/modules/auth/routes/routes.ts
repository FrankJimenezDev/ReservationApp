import { Request, Response, Router } from "express";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controller/controller";
import { User } from "../../../config/entities/users";
import { Auth } from "../model/auth.interface";
import { validarJWT } from "../../../common/middlewares/jwt-validator";
import { check } from "express-validator";


const routes = Router()
const service: Auth<User> = new AuthService()

const strongerPassword = {
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1
}

routes.post('/login', [
    check('email', 'email con formato invalido').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
], (req: Request, res: Response) => new AuthController(service).login(req, res))

routes.post('/register', [
    check('name', 'el name es obligatorio').not().isEmpty(),
    check('email', 'email con formato invalido').isEmail(),
    check('password', 'el password es obligatorio').not().isEmpty(),
    check('password', 'el password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('password', 'La contraseña debe tener al menos 1 letra mayuscula, 1 letra minuscula, 1 numero, 1 caracter especial y tener al menos 6 caracteres').isStrongPassword(strongerPassword),
], (req: Request, res: Response) => new AuthController(service).register(req, res))

routes.post('/logout', validarJWT, (req: Request, res: Response) => new AuthController(service).logout(req, res))


export default routes;