const express = require("express");
const router = express.Router();

const {
  updateProfile,
  deleteAccount,
  getEnrolledCourses,
  getUserDetails,
  updateDisplayPicture,
  instructorDashboard,
} = require("../controllers/Profile");

const { auth, isStudent, isInstructor } = require("../middlewares/auth");

router.get("/getUserDetails", auth, getUserDetails);

router.delete("/deleteProfile", auth, deleteAccount);

router.put("/updateProfile", auth, updateProfile);

router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.put("/updateDisplayPicture", auth, updateDisplayPicture);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
