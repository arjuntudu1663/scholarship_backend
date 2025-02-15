const express = require("express");
const app = express();
const body_parser = require("body-parser")
const mysql = require("mysql2")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const router = require("router")
const jwt = require("jsonwebtoken")

dotenv.config()

const MONGOURI = process.env.MONGOURI
const MYSQLPASSWORD = process.env.MYSQLPASSWORD
const secret_key = process.env.SECRET_KEY

app.use(express.json());
app.use(body_parser.json());
app.use(cors({
    origin:["http://localhost:3000"]
}))



const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: `${MYSQLPASSWORD}`,
    database: 'edtech'
}) 

try{
 

   // mongoose.createConnection("mongodb+srv://arjuntudu9163:fv9FIKG1eb8UKcee@cluster0.cq6wv.mongodb.net/edtech")
   mongoose.connect(`${MONGOURI}`)
}catch(e){
    if(e){
        console.log(err)
    }else{
        console.log("mongodb connected")
    }
}


// routes
const agentRoute = require("./routes/agentRoutes")
const studentRoute = require("./routes/studentRoutes")
const adminRoute = require("./routes/adminRoutes")
const applicationRoutes = require("./routes/applicationRoutes")

app.use("/agent",agentRoute)
app.use("/student",studentRoute)
app.use("/admin",adminRoute)
app.use("/application",applicationRoutes)



app.post("/verifyTokenAgent",async(req,res)=>{
    
    const token = req.body.token;
    try{
          jwt.verify(token,secret_key,(err,decoded)=>{
            if(err){
                return res.json({"flag":false})
            }else{
                return res.json({"flag":true,"token":decoded})
            }
        })
    }catch(e){

        if(e){
            console.log(e);
        }
    }


})

app.get("/",(req,res)=>{
    res.json({"value":"started"})
})


app.listen(5000,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("app started")
    }
})