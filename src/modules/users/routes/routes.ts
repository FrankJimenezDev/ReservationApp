import { Request, Response, Router } from "express";
import { UserService } from "../service/user.service";
import { UsersController } from "../controller/controller";
import { User } from "../../../config/entities/users";


const routes = Router()
const service : Service<User> = new UserService()

routes.get('/', (req : Request, res : Response)=> new UsersController(service).getAllUsers(res))
routes.get('/:id', (req : Request, res : Response)=> new UsersController(service).getOneUsers(req, res))
routes.put('/:id', (req : Request, res : Response)=> new UsersController(service).updateUser(req, res))
routes.delete('/:id', (req : Request, res : Response)=> new UsersController(service).deleteUsers(req, res))

export default routes;