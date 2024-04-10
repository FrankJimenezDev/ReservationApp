import { Request, Response } from "express"
import { Room } from "../../../config/entities/rooms";

export class RoomsController {

    constructor(private service: Service<Room>) { }

    async getAllUsers(req:Request, res: Response) {

        const statusString: string | undefined = req.query.status as string | undefined;
        const status: number | undefined = statusString !== undefined ? parseInt(statusString) : undefined;

        try {

            const result = await this.service.getAll(status)
            res.status(200).json({
                success: true,
                result
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            } else {
                console.error('Unexpected error:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error'
                });
            }
        }
    }

    async getOneUsers(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const result = await this.service.getOne(id);

            res.status(200).json({
                success: true,
                result
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
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
        const { body } = req;
        try {
            const result = await this.service.create!(body)
            res.status(200).json({
                success: true,
                message: 'Habitacion creada con exito',
                result
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
                return;
            } else {
                console.error('Unexpected error:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error'
                });
            }
        }
    }

    async updateUser(req: Request, res: Response) {

        const { id } = req.params;
        const { body } = req

        try {
            const result = await this.service.update(id, body)
            res.status(200).json({
                success: true,
                message: 'Habitacion actualizada con exito',
                result
            })
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
            } else {
                console.error('Unexpected error:', error);
                res.status(500).json({
                    success: false,
                    error: 'Internal Server Error'
                });
            }
        }
    }
    async deleteUsers(req: Request, res: Response) {
        try {
            const result = await this.service.delete(req.params.id)
            res.status(200).json({
                success: true,
                message: 'Habitacion eliminada con exito',
                result
            })
        } catch (error: any) {
            if (error instanceof Error) {
                res.status(404).json({
                    success: false,
                    error: error.message
                });
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