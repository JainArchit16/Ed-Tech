const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review } = req.body;
    const course = await Course.find({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, emessage: "Student not enrolled in course" });
    }
    //     const alreadyReviewed =await RatingAndReview.findOne({user:userId,
    //     course:courseId});

    //     if(alreadyReviewed){
    //         return res.status(404).json({success: false,message: "Already reviewed"});
    //     }

    // const course = await Course.findById({ _id: courseId });

    // console.log(course.studentsEnrolled);

    // if (!course.studentsEnrolled.includes(userId)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "User Not Enrolled",
    //   });
    // }

    // console.log("this", userId);
    const oldRating = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });
    if (oldRating) {
      return res.status(400).json({
        success: false,
        message: "Review Already Registered",
      });
    }
    const newRating = await RatingAndReview.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    console.log("hi");
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: newRating._id,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Rating added successfully",
      newRating,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const course = await Course.findById({ _id: courseId });
    if (!course) {
      return res.status(400).json({
        success: false,
        message: "No Course Found",
      });
    }
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          getAverageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
      });
    }
    return res.status(200).json({
      success: true,
      averageRating: 0,
      message: "No Ratings Yet",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const allReviews = await RatingAndReview.find()
      .sort({ rating: -1 })
      .populate({ path: "user", select: "firstName lastName email image" })
      .populate({ path: "course", select: "courseName" })
      .exec();

    return res.status(200).json({
      success: true,
      message: "all reviews fetched successfully",
      data: allReviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
