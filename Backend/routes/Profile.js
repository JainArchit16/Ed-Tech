const express=require("express");
const router=express.Router();
const {updateProfile,deleteAccount,getEnrolledCourses,getUserDetails,updateDisplayPicture}=require("../controllers/Profile");
const { auth, isStudent } = require("../middlewares/auth");


router.get("/getUserDetails",auth,getUserDetails);


router.delete("/deleteAccount",auth,deleteAccount);

router.put("/updateProfile", auth, updateProfile);

router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.put("/updateDisplayPicture", auth, updateDisplayPicture);


module.exports = router;
