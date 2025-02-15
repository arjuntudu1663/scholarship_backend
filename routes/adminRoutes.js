const express = require("express");
const router = express.Router();
const {adminRegister,adminLogin,adminAllScholarships,adminAllStudents,adminAllagents,adminAllapplications,seeDetails,setGrant,allAppliers} = require("../controllers/adminController")


router.post("/register",adminRegister)
router.post("/login",adminLogin)
router.get("/allScholarships",adminAllScholarships)
router.get("/allStudents",adminAllStudents)
router.get("/allAgents",adminAllagents)
router.get("/allApplications",adminAllapplications)
router.post("/seeDetails",seeDetails)
router.post("/setGrant",setGrant)
router.post("/allAppliers",allAppliers)



module.exports = router