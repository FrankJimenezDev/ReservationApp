import { Request, Response } from "express"
import { Reserve } from "../../../config/entities/reserves";
import { verify } from "../../../common/middlewares/jwt-validator";

export class ReserveController {
    constructor( private service: Service<Reserve> ){}

    getAllReserves(res: Response){}
    getOneReserve(req : Request, res: Response){}

    async create(req : Request, res: Response){
        const token = req.cookies.token
        const payload : any = verify(token)
        const { id } = payload

        const { body } = req;
        body.userid = id

        try {
            const result = await this.service.create!(body)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                })
            }
        }
        
    }
    updateReserve(req : Request, res: Response){}
    deleteReserve(req : Request, res: Response){}
}