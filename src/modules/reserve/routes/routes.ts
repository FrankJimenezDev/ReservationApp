import { Request, Response, Router } from "express";
import { ReserveService } from "../service/reserve.service";
import { ReserveController } from "../controller/reserve.controller";
import { validarJWT } from "../../../common/middlewares/jwt-validator";
import { rolAuth } from "../../../common/middlewares/rol-validator";
import { Reserve } from "../../../config/entities/reserves";


const routes = Router()
const service : Service<Reserve> = new ReserveService()

routes.get('/', validarJWT, rolAuth, ( req, res : Response)=> new ReserveController(service).getAllReserves(res))
routes.get('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new ReserveController(service).getOneReserve(req, res))
routes.post('/', validarJWT, rolAuth, (req : Request, res : Response)=> new ReserveController(service).create(req, res))
routes.put('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new ReserveController(service).updateReserve(req, res))
routes.delete('/:id', validarJWT, rolAuth, (req : Request, res : Response)=> new ReserveController(service).deleteReserve(req, res))

export default routes;