import express from "express";
export const Exprouter=express.Router();
Exprouter.post('/',(req,res)=>{
    res.send("from Exp router");
})