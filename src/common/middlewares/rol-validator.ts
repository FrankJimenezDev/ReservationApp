import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken';


export const rolAuth = (req : Request, res : Response, next : express.NextFunction) => {

    const token = req.cookies.token
    const payload : any = jwt.verify(token || '', process.env.KEY_TOKEN || "")
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

