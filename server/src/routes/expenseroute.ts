import express from "express";
import { middleware } from "../middlewares/middleware";
import { Addexpenses, Getexpenses, Getgroupdata, Getlatest, Getmonthgroupdata, Getspecificexpense, Getstats, Getstatslatest } from "../controllers/expenses";
export const Exprouter=express.Router();
Exprouter.get('/getexpenses',middleware,Getexpenses);
Exprouter.post('/addexpense',middleware,Addexpenses);
Exprouter.get('/getspecific',middleware,Getspecificexpense);
Exprouter.get('/getlatest',middleware,Getlatest);
Exprouter.get('/getstats',middleware,Getstats);
Exprouter.post('/getstatslatest',middleware,Getstatslatest);
Exprouter.get('/getgroup',middleware,Getgroupdata);
Exprouter.post('/getmonthgroup',middleware,Getmonthgroupdata);