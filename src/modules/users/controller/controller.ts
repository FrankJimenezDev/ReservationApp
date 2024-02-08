import { Request, Response } from "express"
import { User } from "../../../config/entities/users";

export class UsersController {

    constructor(private service: Service<User>) { }

    async getAllUsers(res: Response) {
        try {
            const result = await this.service.getAll()
            if (!result.length) {
                return res.status(200).json({
                    success: true,
                    msg: `No se encontraron usuarios registrados`
                })
            }
            res.status(200).json({
                success: true,
                result
            })
        } catch (error: any) {
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
    }
    asyncgetOneUsers(req: Request, res: Response) {

    }
    createUser(req: Request, res: Response) {

    }
    updateUser(req: Request, res: Response) {

    }
    deleteUsers(req: Request, res: Response) {

    }
}