const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }
    const tagDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(tagDetails);
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      success: false,
      message: "Tag Controller Failed",
    });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const allTags = await Category.find({}, { name: true, description: true });
    res.status(200).json({
      success: true,
      message: "All tags returned Successfully",
      allTags,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      success: false,
      message: "All Tags Failed",
    });
  }
};

//Not by me
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById({ _id: categoryId })
      .populate("courses")
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data Not Found",
      });
    }
    const differentCourses = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate("courses")
      .exec();

    // Get top-selling courses across all categories
    const allCategories = await Category.find().populate({
      path: "courses",
      match: { status: "Published" },
      populate: [{ path: "instructor" }, { path: "ratingAndReviews" }],
    });
    const allCourses = allCategories.flatMap((category) => category.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    res.status(200).json({
      data: {
        selectedCourses: selectedCourses,
        differentCourses: differentCourses,
        mostSellingCourses: mostSellingCourses,
      },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
