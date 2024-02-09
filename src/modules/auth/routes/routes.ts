import { Request, Response, Router } from "express";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controller/controller";
import { User } from "../../../config/entities/users";
import { Auth } from "../model/auth.interface";
import { validarJWT } from "../../users/middlewares/jwt-validator";
import { check } from "express-validator";


const routes = Router()
const service : Auth<User> = new AuthService()

routes.post('/login', [
    check('email', 'email con formato invalido').isEmail(),
], (req : Request, res : Response)=> new AuthController(service).login(req, res))

routes.post('/register', [
    check('email', 'email con formato invalido').isEmail(),
], (req : Request, res : Response)=> new AuthController(service).register(req, res))

routes.post('/logout', validarJWT, (req : Request, res : Response)=> new AuthController(service).logout(req, res))


export default routes;