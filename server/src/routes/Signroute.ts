import express from "express";
import { Signup } from "../controllers/Signup";
import { Signin } from "../controllers/Signin";
export const Signrouter = express.Router();
Signrouter.post('/signup',Signup);
Signrouter.post('/signin',Signin);