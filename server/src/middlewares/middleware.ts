import {Request,Response,NextFunction} from "express";
import jwt from "jsonwebtoken";
const jwtpass=process.env.jwt_pass as string;
export const middleware=async(req:any,res:Response,next:NextFunction)=>{
    try{
        const token=req.headers.authorization as string;
        const result:any= jwt.verify(token,jwtpass);
        req.userid=result.id
        next();
    }
    catch(err)
    {
        res.status(404).send(false);
    }

}