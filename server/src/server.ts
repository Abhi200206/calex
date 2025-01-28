import express from "express";
import { Signrouter } from "./routes/Signroute";
import { Exprouter } from "./routes/expenseroute";
const app=express();
const port=3000 ;
app.use(express.json());
app.use('/api/user',Signrouter);
app.use('/api/expense/',Exprouter);
app.listen(port,()=>{
    console.log(`server started on port: ${port}`)
})