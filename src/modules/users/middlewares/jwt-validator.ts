import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import express from 'express';
import { User } from '../../../config/entities/users';


export const validarJWT = async (req: Request, res: Response, next: express.NextFunction) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const payload : any = jwt.verify(token || '', process.env.KEY_TOKEN || "")

        const usuario = await User.findOneBy({
            id: payload.id
        })

        if (!usuario) {
            return res.status(401).json({
                msg: 'token no valido - usuario con estado false'
            })
        }

        payload.id = usuario.id

        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Vuelva a iniciar sesion por favor'
        })
    }
}