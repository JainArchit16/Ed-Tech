const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");

exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const {
      gender,
      dateOfBirth = "",
      about = "",
      contactNumber,
      firstName,
      lastName,
    } = req.body;

    const userDetails = await User.findByIdAndUpdate(
      { _id: user.id },
      {
        firstName: firstName,
        lastName: lastName,
        image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
      },
      { new: true }
    );
    // console.log(userDetails);

    const profile = await Profile.findById({
      _id: userDetails.additionalDetails,
    });

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
    profile.about = about || profile.about;
    profile.gender = gender || profile.gender;
    profile.contactNumber = contactNumber || profile.contactNumber;

    await profile.save();

    const updatedUserDetails = await User.findById({ _id: user.id })
      .populate("additionalDetails")
      .exec();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    const user = await User.findById({ _id: userId });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    console.log(user.additionalDetails);
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });

    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      );
    }

    // const courseIds= await User.findById({_id:userId}).courses;

    // //There Can be Error in it
    // for (const courseId of courseIds) {
    //     const course = await Course.findById(courseId);
    //     if (course) {
    //         const indexOfUser = course.enrolledUsers.indexOf(userId);
    //         if (indexOfUser !== -1) {
    //             course.enrolledUsers.splice(indexOfUser, 1);
    //             await course.save();
    //         }
    //     }
    // }
    await User.findByIdAndDelete({ _id: userId });

    //enroll number decrease code

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User Cannot be deleted successfully",
      error: error.message,
    });
  }
};

//See Not by me carefully
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].courseDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(500).json({
        success: false,
        message: "User not found",
      });
    }
    const userDetails = await User.findById({ _id: userId })
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "User Fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "User Cannot be Fetched",
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    let user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const image = req.files.pfp;
    console.log(image);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    const response = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );
    user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        image: response.secure_url,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Not by me
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      //create an new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
