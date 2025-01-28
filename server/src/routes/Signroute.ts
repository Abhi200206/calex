import express from "express";
import { Signup } from "../controllers/Signup";
export const Signrouter = express.Router();
Signrouter.post('/signup',Signup);