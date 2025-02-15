const express = require("express")
const router = express.Router();
const {createApplication,addApplicationToStudent,myApplications} = require ("../controllers/applicationController")

router.post("/addApplication",createApplication)
router.post("/addApplicationToStudent",addApplicationToStudent)
router.post("/myApplications",myApplications)

module.exports = router