import { Request, Response } from "express"
import { Reserve } from "../../../config/entities/reserves";

export class ReserveController {
    constructor( private service: Service<Reserve> ){}

    getAllReserves(){}
    getOneReserve(){}
    create(){}
    updateReserve(){}
    deleteReserve(){}
}