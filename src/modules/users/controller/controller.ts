import { Request, Response } from "express"
import { User } from "../../../config/entities/users";

export class UsersController {

    constructor(private service : Service<User>){

    }

    getAllUsers(res : Response){
        const result = this.service.getAll()
        res.json({
            result
        })
    }
    getOneUsers(req : Request, res: Response){

    }
    createUser(req : Request, res : Response){

    }
    updateUser(req : Request, res : Response){

    }
    deleteUsers(req : Request, res : Response){

    }
}