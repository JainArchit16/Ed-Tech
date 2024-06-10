const Section = require("../models/Section");
// const subSection=require("../models/SubSection");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const cloudinary = require("cloudinary").v2;

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }

    const newSection = await Section.create({
      sectionName: sectionName,
    });

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      message: "Section Added Successfully",
      success: true,
      updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    const updatedCourse = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedCourse,
    });
  } catch (error) {
    // console.error("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    // const { sectionId} = req.params;

    const { courseId, sectionId } = req.body;

    const section = await Section.findById({ _id: sectionId });

    const subSectionIds = section.subSection;

    // console.log(subSectionIds);
    // Delete the section
    await Section.findByIdAndDelete({ _id: sectionId });

    // Delete videos from Cloudinary
    for (const subSectionId of subSectionIds) {
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
    }

    // Delete the sub-sections
    await SubSection.deleteMany({ _id: { $in: subSectionIds } });

    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: {
          courseContent: sectionId,
        },
      },
      { new: true }
    )
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();

    res.status(200).json({
      success: true,
      message: "Section deleted",
      updatedCourse,
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
