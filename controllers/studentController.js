const {Student,ScholarShips} = require("../models/models")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const cheerio = require('cheerio')
const axios = require('axios')

const secret_key = process.env.SECRET_KEY

const studentRegister = async function(req,res){

    try{
         
        const response = await Student.find({username:req.body.username,password:req.body.password});
        if(response.length>0){
            res.json({"flag":false})
        }else{
            const response2 = await Student.create(req.body);
            console.log(response2)
            res.json({"flag":true,value:response2})
        }

    }catch(e){
        if(e){
            console.log(e)
        }
    }

}

const studentLogin = async function(req,res){
 
   try{
       const response = await Student.find({username:req.body.username,password:req.body.password});
       if(response.length>0){
         
        const token = jwt.sign(req.body,secret_key,{expiresIn:"5h"})

        res.json({"flag":true,value:response,token:token})

       }else{
        res.json({"flag":false})
       }
       
   }catch(e){
       if(e){
           console.log(e)
       }
   }

}


const studentUpdate1 = async function(req,res){
    


    const studentId = req.body.studentId
    const name = req.body.name 
    const country = req.body.country

    try{
         
        const response = await Student.findOneAndUpdate({_id:studentId},{
            $set:{
                name:name,
                country:country
            }
        })
        
        res.json({"flag":true,value:response})
        

    }catch(e){}
  
}

const studentUpdate2 = async function(req,res){
     
  
    const studentId = req.body.studentId
    const degree = req.body.degree
    const neet = req.body.neet 
    const hs = req.body.hs 
    const pcb = req.body.pcb 

    try{
        const response = await Student.findOneAndUpdate({_id:studentId},{
            $set:{
                degree:degree,
                neet:neet,
                hs:hs,
                pcb:pcb
            }
        })
        res.json({"flag":true,"value":response})
        

    }catch(e){

    }



}

const studentFind = async function(req,res){
     
    const studentId = req.body.studentId 

    try{
        const response = await Student.find({_id:studentId})
        
        if(response.length>0){
            res.json({"flag":true,"value":response[0]})
        }
        
       

    }catch(e){}

}


const scholarshipFind = async function(req,res){
       
    console.log("hittttttttttttttttttttttttttttttttttttttttt")

    const studentId = req.body.studentId
    const countryName =req.body.countryName
   
        try{
            const studentFindResponse = await Student.find({_id:req.body.studentId});
           
            const s = studentFindResponse[0]
            const sNeet = s.neet
            const sPcb = s.pcb 
            const sHs = s.hs
            
          
    
    
            if(countryName.length>0){

                    const scholarshipFindResponse = await ScholarShips.find({
                        $and:[
                            {
                                neet:{$lt:sNeet}
                            },{
                                pcb :{$lt:sPcb}
                            },{
                                hs: {$lt:sHs}
                            },{
                                country:{$eq:countryName}
                            }
                        ]
                    });
                    console.log(scholarshipFindResponse,"<=== by country")
                    if(scholarshipFindResponse.length>0){
                        res.json({"flag":true,"value":scholarshipFindResponse})
                    }else{
                        res.json({"flag":false,"value":scholarshipFindResponse})
                    }

            }else{   
                const scholarshipFindResponse = await ScholarShips.find({
                    $and:[
                        {
                            neet:{$lt:sNeet}
                        },{
                            pcb :{$lt:sPcb}
                        },{
                            hs: {$lt:sHs}
                        }
                    ]
                });

                console.log(scholarshipFindResponse,"<== all scholarships")
                     
                        if(scholarshipFindResponse.length>0){
                            res.json({"flag":true,"value":scholarshipFindResponse})
                        }else{
                            res.json({"flag":false,"value":scholarshipFindResponse})
                        }

            }
    
            
            
            
    
        }catch(e){}
    
       
   

}

const studenFind = async function(req,res){
     
    try{
        const response = await Student.find({_id:req.body.id});
        res.json({"flag":true,"value":response[0]})
    }catch(e){

    }

}


const f = async function(){
     
    try{
        const { data } = await axios.get('https://universityinsights.in/study-in-canada/');
        const $ = cheerio.load(data);
        $('h2:contains("Eligibility Criteria")').each((i, el) => {
            // For each h1 element, find the next text elements (p, div, etc.)
            const nextTextElements = $(el).nextAll().map((i, el) => $(el).text()).get();
          
            console.log(`Text elements after "${$(el).text()}":`);
            console.log(nextTextElements);
          });
    }catch(e){}
}


module.exports = {studentRegister,studentLogin,studentUpdate1,studentUpdate2,studentFind,scholarshipFind,f,studenFind}