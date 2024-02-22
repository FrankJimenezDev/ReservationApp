import express, { Request, Response } from "express";
import { Payload } from '../../auth/model/payload';
import jwt from 'jsonwebtoken';


export const adminAuth = (req : Request, res : Response, next : express.NextFunction) => {

    const token = req.cookies.token
    const payload : any = jwt.verify(token || '', process.env.KEY_TOKEN || "")

    const isAdmin = payload.rol

    if (isAdmin) {
        next()
    } else {
        res.status(403).json({
            msg : 'Acceso prohibido'
        });
    }
}