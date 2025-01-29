import { PrismaClient } from "@prisma/client";
import {Request,Response,NextFunction} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const jwtpass=process.env.jwt_pass|| "w";
export const Signin=async(req:Request,res:Response, next: NextFunction) : Promise<any>=>{
    const {email,password}=req.body;
    try{
        let result= await prisma.users.findFirst({
            where:{
                email
            },
            select:{
                id:true,
                name:true,
                password:true
            }
        })|| {id:"1233",password:"hi"};
        const ans:boolean=await bcrypt.compare(password,result.password);
        result={...result,password:"are u serious ? you are checking passwords Too!!!"};
        const token= jwt.sign({email,id:result.id},jwtpass);
        return res.json({'result':result,token});
    }
    catch(err)
    {
        console.log(err);
        res.status(404);
    }
}