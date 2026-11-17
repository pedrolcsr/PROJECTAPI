import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request{
    user?: {id:number};
}


export function verifyToken(req: AuthRequest, res: Response, next: NextFunction ): void{

        const authHeader = req.headers.authorization;


        if(!authHeader){
            res.status(401).json({
            message: "Token invalido ou expirado!",
             });
            return;
        }
        

        const [bearer, token] = authHeader.split(" ")


        if(!token || bearer?.toLocaleLowerCase() !== "bearer"){
                res.status(401).json({
            message: "Token invalido!",
             });
            return;

        }


    
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id: number};


        req.user = {id: decoded.id}






        next()



    }catch(error){
        res.status(401).json({
            message: "Token invalido ou expirado!",
        });
        return;



    }
    


}