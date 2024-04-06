import { Request, Response, Router } from "express";
import { RoomService } from "../service/room.service";
import { RoomsController } from "../controller/controller";
import { validarJWT } from "../../../common/middlewares/jwt-validator";
import { rolAuth } from "../../../common/middlewares/rol-validator";
import { Room } from "../../../config/entities/rooms";


const routes = Router()
const service : Service<Room> = new RoomService()

routes.get('/', validarJWT, rolAuth, ( req : Request, res : Response)=> new RoomsController(service).getAllUsers(req, res))
routes.get('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new RoomsController(service).getOneUsers(req, res))
routes.post('/', validarJWT, rolAuth, (req : Request, res : Response)=> new RoomsController(service).create(req, res))
routes.put('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new RoomsController(service).updateUser(req, res))
routes.delete('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new RoomsController(service).deleteUsers(req, res))

export default routes;