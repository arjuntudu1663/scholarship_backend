const {Admin,Student,ScholarShips, Agent,Applications} = require("../models/models");
const mysql = require("mysql2")
const { v4: uuidv4 } = require("uuid");


MYSQLPASSWORD = process.env.MYSQLPASSWORD

const dbPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: `${MYSQLPASSWORD}`,
    database: 'edtech'
}) 


function generateUniqueId() {
    return  Math.floor(Math.random() * 90000) + 10000;
  }

const adminRegister = async function(req,res){
     
    const id = generateUniqueId();

    
 
    try{
        
        dbPool.query('insert into edtech.admin values (?,?,?)',[id,req.body.name,req.body.password],(err,result)=>{
             
            if(err){
                   
                if(err.message.includes("name_UNIQUE")){
                    res.json({"flag":false,value:{"message":"name already exists"}})
                }
           
                }else{
               
                res.json({"flag":true,value:{"id":id}})
               
         }
      })

    }catch(e){}



}

const adminLogin = async function(req,res){
      
    

    try{
        dbPool.query('select * from edtech.admin where name = ? and password = ?',[req.body.name,req.body.password],(err,result)=>{
          
             if(result.length>0){
                res.json({"flag":true,"value":{"profile":result[0]}})
             }else{
                res.json({"flag":false})
             }   
        })
    }catch(e){}
}


const adminAllScholarships = async function(req,res){
     
      try{
         
        const response = await ScholarShips.find({})
   
        res.json({"flag":true,"value":response})

      }catch(e){}
     

}

const adminAllStudents = async function(req,res){
     
    try{
       
      const response = await Student.find({})
 
      res.json({"flag":true,"value":response})

    }catch(e){}
   

}

const adminAllagents = async function(req,res){
     
    try{
       
      const response = await Agent.find({})
 
      res.json({"flag":true,"value":response})

    }catch(e){}
   

}

const adminAllapplications= async function(req,res){
   
    try{
        dbPool.query('select * from edtech.applications;',(err,result)=>{
            if(err){
                res.json({"flag":false})
            }else{
                
                 

                res.json({"flag":true,"value":result})
                
            }
        })
    }catch(e){

    }

}

const seeDetails = async function(req,res){
     
     try{
        const studentFind = await Student.find({_id:req.body.studentId});
        const scholarShipFind = await ScholarShips.find({_id:req.body.scholarshipId})
        
        res.json({"value":true,value:{"student":studentFind[0],"scholarship":scholarShipFind[0]}})

     }catch(e){

     }

}

const setGrant = async function(req,res){
     
     try{
        dbPool.query('update edtech.applications set status = 1 where id = (?) ',[req.body.applicationId],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                 
                res.json({"flag":true,"value":result})
            }
        })
     }catch(e){

     }

}

const allAppliers = async function(req,res){
    
     const scholarShipId = req.body.id

     const allAppliers = [];

    try{
        
         dbPool.query('select studentId from edtech.applications where ScholarShipId = (?)',[req.body.scholarShipId],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                
                result.map(async (x)=>{
                     
                    const response = await Student.find({_id:x.studentId})
                     allAppliers.push(response[0]);

                })
                

                res.json({"flag":true,"value":result})

            }
         })

    }catch(e){

    }

}


module.exports = {adminRegister,adminLogin,adminAllScholarships,adminAllStudents,adminAllagents,adminAllapplications,seeDetails,setGrant,allAppliers}