import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
let monthsarr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const Getexpenses = async (req: any, res: Response) => {
    try {
        const { id }: { id: string } = req.userid || "---";
        const result = await prisma.expense.findMany({
            where: {
                userid: id
            }
        });
        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("error at server!");
    }
}
export const Addexpenses = async (req: any, res: Response) => {
    try {
        const { amount, label, To }: { amount: number, label: string, To: string } = req.body;
        const userid = req.userid || "check";
        const date = new Date();
        const dt = date.getDate();
        const indx = date.getMonth();
        const year = date.getFullYear();
        const month = monthsarr[indx];
        let result = await prisma.expense.create({
            data: {
                amount,
                label,
                To,
                month,
                date: new Date(),
                userid,
                year
            }
        });
        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("error at server!");
    }
};

export const Getspecificexpense = async (req: any, res: Response) => {
    try {
        let { year, month }: { year: number, month: string } = req.body;
        const userid = req.userid;
        let result = await prisma.expense.findMany({
            where: {
                userid,
                month,
                year
            }
        });
        res.status(200).json({ result });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("error at server!");
    }
};

export const Getlatest = async (req: any, res: Response) => {
    try {
        const userid = req.userid;
        let result = await prisma.expense.findMany({
            orderBy:{
                date:'desc'
            }
        });
        res.status(200).json({ result:result[0] });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("error at server!");
    }
}

export const Getstatslatest=async(req:any,res:Response)=>{
    try{
        const userid=req.userid;
        let { year, month }: { year: number, month: string } = req.body;
        const result=await prisma.expense.aggregate({
            _sum:{
                amount:true
            },
            _count:{
                id:true
            },
            where:{
                userid,
                month,
                year
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(404).send("error at server!");
    }
}

export const Getstats=async(req:any,res:Response)=>{
    try{
        const userid=req.userid;
        const result=await prisma.expense.aggregate({
            _sum:{
                amount:true
            },
            _count:{
                id:true
            },
            where:{
                userid
            }
        });
        res.status(200).json(result);
    }
    catch (err) {
        console.log(err);
        res.status(404).send("error at server!");
    }
}