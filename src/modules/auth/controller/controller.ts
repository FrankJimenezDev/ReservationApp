import { Request, Response } from "express"
import { User } from "../../../config/entities/users";
import { Auth } from '../model/auth.interface';
import { validationResult } from "express-validator";

export class AuthController {

    constructor(private service: Auth<User>) { }

    async register(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }

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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }
        const { body } = req;
        try {
            const result = await this.service.login(body)
            res.cookie('token', result.token, { httpOnly: true });
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

    async logout(req: Request, res: Response) {

        try {
            res.cookie('token', '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;');
            res.status(200).json({
                success: true,
                msg: `Cierre de sesion exitoso`
            })

        } catch (error) {
            console.error('Unexpected error:', error);
            res.status(500).json({
                success: false,
                error: 'Internal Server Error'
            });
        }
    }

}