import { Request, Response } from "express"
import { Reserve } from "../../../config/entities/reserves";
import { verify } from "../../../common/middlewares/jwt-validator";
import { Service } from "../../../common/interfaces/services";

export class ReserveController {
    constructor(private service: Service<Reserve>) { }

    async getAllReserves(req: Request, res: Response) {

        const statusString: string | undefined = req.query.status as string | undefined;
        const reserveDayString: string | undefined = req.query.reserveday as string | undefined;

        const status: number | undefined = statusString !== undefined ? parseInt(statusString) : undefined;
        const reserveDay: string | undefined = reserveDayString !== undefined ? reserveDayString : undefined;

        try {
            //optimizar
            const result = await this.service.getAll({status, reserveDay})
            res.status(200).json({
                success: true,
                result
            })
        } catch (error: any) {
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

    async getOneReserve(req: Request, res: Response) {
        const { id } = req.params

        try {
            const result = await this.service.getOne(id)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error: any) {
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

    async create(req: Request, res: Response) {

        const token = req.cookies.token
        const payload: any = verify(token)
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

    async updateReserve(req: Request, res: Response) {
        const { id } = req.params
        const { body } = req

        try {
            const result = await this.service.update(id, body)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error: any) {
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

    async deleteReserve(req: Request, res: Response) {
        const { id } = req.params

        try {
            const result = await this.service.delete(id)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error: any) {
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
}