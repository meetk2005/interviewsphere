import express from "express";
import path from "path"
import cors from "cors"
import {serve} from "inngest/express"
import { inngest, functions } from "./lib/inngest.js";

import {ENV} from "./lib/env.js";
import { connectDB } from "./lib/db.js";
const app=express();

// console.log(ENV.PORT)
// console.log(ENV.DB_URL)

const __dirname=path.resolve();

//middlewares
app.use(express.json())

//credntials true meaning?? => server allows a brower (our frontend) to include cookies on request
app.use(cors({origin:ENV.CLIENT_URL || "http://localhost:5173",credentials:true}))

app.use("/api/inngest",serve({client:inngest, functions}))

app.get("/",(req,res)=>{
    res.status(200).json({msg:"hello nile bille."})
})

app.get("/health",(req,res)=>{
    res.status(200).json({msg:"api is up and running"})
})

//make or app ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}




const startServer=async()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,() => {
            console.log("Server is running on port:",ENV.PORT)});
    }catch(error){
        console.error("Error starting the server",error)
    }
};
startServer();