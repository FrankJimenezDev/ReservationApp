import { Request, Response, Router } from "express";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controller/controller";
import { User } from "../../../config/entities/users";
import { Auth } from "../model/auth.interface";


const routes = Router()
const service : Auth<User> = new AuthService()

routes.post('/', (req : Request, res : Response)=> new AuthController(service).login(req, res))
routes.post('/register', (req : Request, res : Response)=> new AuthController(service).register(req, res))

export default routes;