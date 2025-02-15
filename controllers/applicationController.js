const {Student,ScholarShips} = require("../models/models")
const mysql = require("mysql2")
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

const createApplication = async function(req,res){
    
    
      const scId = req.body.scholarShipId     
      const sId = req.body.studentId     
      const aId = req.body.agentId    
      const ScholarShipCountry = req.body.ScholarShipCountry
      const StudentCountry = req.body.StudentCountry
      const id = generateUniqueId(); 
      
  

    try{  

        
       dbPool.query('insert into edtech.applications values (?,?,?,?,?,?,?);',[id,sId,aId,0,ScholarShipCountry,StudentCountry,scId],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                
                res.json({"flag":true,"value":{applicationId:id}})
            }
        })

        
        
    }catch(e){

    }

}

const myApplications = async function(req,res){
     
    try{
        dbPool.query('select * from edtech.applications where studentId = (?)',[req.body.id],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.json({"flag":true,"value":result})
            }
        })
    }catch(e){}

}

const addApplicationToStudent = async function(req,res){
     
    console.log(req.body)
}





module.exports = {createApplication,addApplicationToStudent,myApplications}