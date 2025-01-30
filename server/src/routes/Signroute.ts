import express from "express";
import { Signup } from "../controllers/Signup";
import { Signin } from "../controllers/Signin";
import { middleware } from "../middlewares/middleware";
export const Signrouter = express.Router();
Signrouter.post('/signup', Signup);
Signrouter.post('/signin', Signin);
Signrouter.get('/me',middleware, async (req, res) => {
    res.send(true);
});