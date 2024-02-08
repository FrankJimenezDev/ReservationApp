import { Request, Response } from "express"
import { User } from "../../../config/entities/users";
import { Auth } from '../model/auth.interface';

export class AuthController {

    constructor(private service: Auth<User>) { }

    async register(req: Request, res: Response) {
        const { body } = req;
        try {
            const result = await this.service.register(body)
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

    async login(req: Request, res: Response) {
        const { body } = req;
        try {
            const result = await this.service.login(body)
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

}