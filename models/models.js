const mongoose = require("mongoose");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('edtech', 'root', 'Redhawse*1', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mssql'
  });


const Student = mongoose.model("student_edtech",{
    username:String,
    password:String,
    name:String,
    country:String,
    neet:Number,
    hs:Number,
    pcb:Number,
    degree:String,
    scholarShips:[],
    applications:[],
})

const Agent = mongoose.model("agent_edtech",{
    username:String,
    password:String,
    scholarShips:[], 

})


const Admin = sequelize.define("admin_edtech", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    password:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    }
});

const ScholarShips =  mongoose.model("scholarships",{
   
  agentId:String,
  name:String,
  country:String,
  neet:Number,
  pcb:Number,
  price:Number,
  hs:Number,
  exams:[],
  documents:[]

})

const Applications = mongoose.model("Applications",{
   
    scholarShipId:String,
    studentId:String,
    agentId:String,
    country:String,
    status:Boolean
   
})


module.exports =  {Student,Agent,Admin,ScholarShips,Applications}