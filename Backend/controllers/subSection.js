const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course");

const cloudinary = require("cloudinary").v2;

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, sectionId } = req.body;
    const video = req.files.video;
    if (!title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }
    const response = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_VIDEO
    );

    const newSubSection = await SubSection.create({
      title,
      description,
      videoUrl: response.secure_url,
      timeDuration: response.timeDuration,
    });

    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: newSubSection._id } },
      { new: true }
    ).populate("subSection");
    // Return the updated section in the response
    return res.status(200).json({ success: true, updatedSection });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Not by me
exports.updateSubSection = async (req, res) => {
  try {
    // Extract necessary information from the request body
    const { subSectionId, title, description, courseId } = req.body;

    const video = req?.files?.video;
    let uploadDetails = null;
    // Upload the video file to Cloudinary
    if (video) {
      uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_VIDEO
      );

      // Get the current SubSection details
      const currentSubSection = await SubSection.findById({
        _id: subSectionId,
      });

      // Delete the previous video from Cloudinary if it exists
      if (currentSubSection.videoUrl) {
        const publicId = currentSubSection.videoUrl
          .split("/")
          .pop()
          .split(".")[0];
        // console.log(`videos/${publicId}`);

        cloudinary.uploader.destroy(`videos/${publicId}`, {
          resource_type: "video",
        });
      }
    }

    // Create a new sub-section with the necessary information
    // console.log(subsectionId);
    const SubSectionDetails = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title || SubSection.title,
        // timeDuration: timeDuration,
        description: description || SubSection.description,
        videoUrl: uploadDetails?.secure_url || SubSection.videoUrl,
      },
      { new: true }
    );

    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//Not by me
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, courseId } = req.body;
    const sectionId = req.body.sectionId;
    if (!subSectionId || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }
    const ifsubSection = await SubSection.findById({ _id: subSectionId });
    const ifsection = await Section.findById({ _id: sectionId });
    if (!ifsubSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }
    if (!ifsection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    const currentSubSection = await SubSection.findById({
      _id: subSectionId,
    });

    // Delete the previous video from Cloudinary if it exists
    if (currentSubSection.videoUrl) {
      const publicId = currentSubSection.videoUrl
        .split("/")
        .pop()
        .split(".")[0];
      //   console.log(`videos/${publicId}`);

      cloudinary.uploader.destroy(`videos/${publicId}`, {
        resource_type: "video",
      });
    }

    await SubSection.findByIdAndDelete(subSectionId);
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $pull: { subSection: subSectionId } },
      { new: true }
    );
    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Sub-section deleted",
      data: updatedCourse,
    });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error deleting sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
