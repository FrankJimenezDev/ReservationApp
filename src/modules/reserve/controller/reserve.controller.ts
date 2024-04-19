import { Request, Response } from "express"
import { Reserve } from "../../../config/entities/reserves";
import { verify } from "../../../common/middlewares/jwt-validator";

export class ReserveController {
    constructor( private service: Service<Reserve> ){}

    getAllReserves(req:Request, res: Response){}

    async getOneReserve(req : Request, res: Response){
        const { id } = req.params

        try {
            const result = await this.service.getOne(id)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error : any) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                })
            } else {
                console.error('Unexpected error:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error'
                });
            }
        }
    }

    async create(req : Request, res: Response){
        
        const token = req.cookies.token
        const payload : any = verify(token)
        const { id } = payload

        const { body } = req;
        const { reserveRoom, ...rest } = body
        rest.user_id = id        

        try {
            const result = await this.service.create!(rest, reserveRoom)
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
    
    async updateReserve(req : Request, res: Response){
        const { id } = req.params
        const { body } = req

        try {
            const result = await this.service.update(id, body)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error : any) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                })
            } else {
                console.error('Unexpected error:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error'
                });
            }
        }
    }
    deleteReserve(req : Request, res: Response){}
}