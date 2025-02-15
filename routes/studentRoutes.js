const express = require("express")
const router = express.Router();
const {studentRegister,studentLogin,studentUpdate1,studentUpdate2,studentFind,scholarshipFind,f,studenFind} = require("../controllers/studentController")

router.post("/login",studentLogin)
router.post("/register",studentRegister)
router.post("/update",studentUpdate1)
router.post("/update2",studentUpdate2)
router.post("/check",studentFind)
router.post("/scholarshipFind",scholarshipFind)
router.post("/f",f)
router.post("/studenFind",studenFind)

module.exports = router