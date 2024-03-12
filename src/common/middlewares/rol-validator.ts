import express, { Request, Response } from "express";
import { verify } from './jwt-validator';


export const rolAuth = (req : Request, res : Response, next : express.NextFunction) => {

    const token = req.cookies.token
    const payload : any = verify(token)
    const isAdmin = payload.rol
    const idUser = payload.id

    if (isAdmin) {
       return next()
    } 

    const idParam = req.params.id
    
    if (!idParam) {
        res.status(403).json({
            msg : 'Acceso prohibido'
        });
    } else if (idParam === idUser) {
        next()
    } else {
        res.status(403).json({
            msg : 'Acceso prohibido'
        });
    }
}

