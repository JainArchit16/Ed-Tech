const express=require("express");
const router=express.Router();
const {updateProfile,deleteAccount,getEnrolledCourses,getUserDetails}=require("../controllers/Profile");
const { auth, isStudent } = require("../middlewares/auth");


router.get("/getUserDetails",auth,getUserDetails);


router.delete("/deleteAccount",auth,deleteAccount);

router.put("/updateProfile", auth, updateProfile);

router.get("/getEnrolledCourses", auth, getEnrolledCourses);


module.exports = router;
