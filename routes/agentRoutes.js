const express = require("express")
const router = express.Router();
const {agentRegister,agentLogin,createScholarShip,getScholarShip} = require("../controllers/agentController")

router.post("/register",agentRegister)
router.post("/login",agentLogin)
router.post("/createScholarShip",createScholarShip)
router.post("/getScholarShip",getScholarShip)

module.exports = router

