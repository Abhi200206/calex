import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();
import {Request,Response,NextFunction} from "express";
import { Signuptype } from "../Types/type";
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
               }
          });
          return res.json({'ans':result});
     }
     catch(err)
     {
          console.log(err);
          return res.status(404);
     }
   
     
}