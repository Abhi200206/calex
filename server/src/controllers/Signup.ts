import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import {Request,Response,NextFunction} from "express";
import { Signuptype } from "../Types/type";
const jwtpass=process.env.jwt_pass|| "w";
export const Signup=async(req:Request,res:Response, next: NextFunction) : Promise<any>=>{
     const {email,password,name}:Signuptype=req.body;
     //console.log(email+password+name);
     try{
          let pass:string=await bcrypt.hash(password,8);
          let result=await prisma.users.create({
               data:{
                    email,
                    password:pass,
                    name
               },
               select:{
                    email:true,
                    name:true,
                    id:true
               }
          });
          const token= jwt.sign({email,id:result.id},jwtpass);
          return res.json({'result':result,token});
     }
     catch(err)
     {
          console.log(err);
          return res.status(404);
     }
   
     
}