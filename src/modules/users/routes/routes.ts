import { Request, Response, Router } from "express";
import { UserService } from "../service/user.service";
import { UsersController } from "../controller/controller";
import { User } from "../../../config/entities/users";
import { validarJWT } from "../../../common/middlewares/jwt-validator";
import { rolAuth } from "../../../common/middlewares/rol-validator";
import { Service } from "../../../common/interfaces/services";


const routes = Router()
const service : Service<User> = new UserService()

routes.get('/', validarJWT, rolAuth, ( req, res : Response)=> new UsersController(service).getAllUsers(req, res))
routes.get('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new UsersController(service).getOneUserById(req, res))
routes.put('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new UsersController(service).updateUser(req, res))
routes.delete('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new UsersController(service).deleteUsers(req, res))

export default routes;