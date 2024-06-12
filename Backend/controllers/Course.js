const Category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const cloudinary = require("cloudinary").v2;

exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const instructorDetails = await User.findById({ _id: userId });

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Not Found",
      });
    }
    // console.log(category);

    const categoryDetails = await Category.findById({ _id: category });
    // console.log(categoryDetails);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: categoryDetails._id,
      tag,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    const updatedUser = await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    const updatedCourse = await Course.findOne({
      _id: newCourse._id,
    })

      .populate("category")

      .exec();

    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      data: updatedCourse,
    });
  } catch (err) {
    // console.error(err.message);
    return res.status(400).json({
      success: false,
      message: "Course Creation Failed",
    });
  }
};

//Not by me see it
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      // console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );

      const publicIdImage = course.thumbnail
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "");

      cloudinary.uploader.destroy(`images/${publicIdImage}`, {
        type: "upload",
        resource_type: "image",
      });

      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else if (key === "category") {
          const newCategory = await Category.findById({ _id: updates[key] });
          if (newCategory) {
            // Remove the course from the old category
            if (course.category) {
              const oldCategory = await Category.findById(course.category);
              if (oldCategory) {
                oldCategory.course = oldCategory.course.filter(
                  (courseId) => courseId.toString() !== course._id.toString()
                );
                await oldCategory.save();
              }
            }

            // Move the course to the new category
            newCategory.course.push(courseId);
            await newCategory.save();

            course.category = newCategory._id;
          }
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}, { courseName: true })
      .populate("instructor")
      .exec();
    res.status(200).json({
      success: true,
      message: "All Courses Fetched",
      data: courses,
    });
  } catch (err) {
    // console.error(err.message);
    return res.status(400).json({
      success: false,
      message: "Get all Courses failed",
      error: err.message,
    });
  }
};

//Not by me
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    //find course details
    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: { courseDetails, totalDuration },
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Not by me
exports.getInstructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let instructorCourses = await Course.find({
      instructor: userId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    const modifiedCourses = instructorCourses.map((course) => {
      let totalDurationInSeconds = 0;
      course.courseContent.forEach((content) => {
        totalDurationInSeconds += content.subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration, 10),
          0
        );
      });

      // Create a new object with course data and calculated courseDuration
      return {
        ...course._doc, // Copy all properties of the course document
        courseDuration: convertSecondsToDuration(totalDurationInSeconds), // Add the courseDuration property
      };
    });

    res.status(200).json({
      success: true,
      data: modifiedCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

//Not by me
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId, token } = req.body;
    // console.log(courseId);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }
    // Delete sections and sub-sections
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          const subSection = await SubSection.findById({ _id: subSectionId });
          if (subSection && subSection.videoUrl) {
            // Extract public_id from Cloudinary URL
            const publicId = subSection.videoUrl
              .split("/")
              .pop()
              .replace(/\.[^/.]+$/, "");

            // Delete the video from Cloudinary
            cloudinary.uploader.destroy(`videos/${publicId}`, {
              resource_type: "video",
            });
          }
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId);
    }

    const publicIdImage = course.thumbnail
      .split("/")
      .pop()
      .replace(/\.[^/.]+$/, "");

    cloudinary.uploader.destroy(`images/${publicIdImage}`, {
      type: "upload",
      resource_type: "image",
    });

    // Delete the course
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//Not by me
//see commented much part of it check
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // console.log("hello 1");

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    // console.log("courseProgressCount : ", courseProgressCount);

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
