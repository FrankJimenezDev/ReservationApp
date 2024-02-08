import { Request, Response } from "express"
import { User } from "../../../config/entities/users";

export class UsersController {

    constructor(private service: Service<User>) { }

    getAllUsers(res: Response) {
        try {
            const result = this.service.getAll()
            res.status(200).json({
                result
            })
        } catch (error) {

        }

    }
    getOneUsers(req: Request, res: Response) {

    }
    createUser(req: Request, res: Response) {

    }
    updateUser(req: Request, res: Response) {

    }
    deleteUsers(req: Request, res: Response) {

    }
}