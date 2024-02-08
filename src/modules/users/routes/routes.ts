import { Router } from "express";
import { UserService } from "../service/user.service";
import { UsersController } from "../controller/controller";
import { User } from "../../../config/entities/users";


const routes = Router()
const service : Service<User> = new UserService()

routes.get('/', (req, res)=> new UsersController(service).getAllUsers(res))
routes.get('/', )
routes.post('/', )
routes.put('/', )
routes.delete('/', )

export default routes;