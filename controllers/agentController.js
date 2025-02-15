
const {Agent, ScholarShips} = require("../models/models")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");

const secret_key = process.env.SECRET_KEY

const agentRegister = async function(req,res){
     
    try{
        const response = await Agent.create(req.body);
    }catch(e){
        if(e){
            console.log(e)
        }
    }

}

const agentLogin = async function(req,res){
    
   

     try{
        const response = await Agent.find({username:req.body.username,password:req.body.password});
    
        if(response.length>0){
            
          const token =   jwt.sign(req.body,secret_key,{expiresIn:"5h"});

          res.json({"flag":true,"token":token,"value":response})

        }
     }catch(e){}

}

const createScholarShip = async function(req,res){
    console.log(req.body,"<=== incoming")
    try{
        const response = await ScholarShips.create(req.body);
        
        res.json({"flag":true,value:response})

    }catch(e){}

}

const getScholarShip = async function(req,res){
    
    

    try{
        const response = await ScholarShips.find({agentId:req.body.id});
        if(response.length>0){
            res.json({"flag":true,"value":response})
        }
    }catch(e){
        
    }

}



module.exports = {agentRegister,agentLogin,createScholarShip,getScholarShip}