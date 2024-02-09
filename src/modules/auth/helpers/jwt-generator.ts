import jwt from "jsonwebtoken"
import { Payload } from "../model/payload";

export const generarJWT = (payload: Payload): Promise<string> => {

    return new Promise((resolve, reject) => {

        jwt.sign({
            id: payload.id,
            rol: payload.rol,
            status: payload.status
        },
            process.env.KEY_TOKEN || "",
            {
                expiresIn: '24h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    if (token) {
                        resolve(token);
                    }

                }
            })
    })
}