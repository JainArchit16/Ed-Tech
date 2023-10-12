const Category=require("../models/Category");
const User=require("../models/User");
const Course=require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createCourse=async (req,res)=>{

    try{
        const userId=req.user.id;
        const instructorDetails=await User.findById({_id:userId});

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

        const thumbnail=req.files.thumbnailImage;

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

        if(!instructorDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor Not Found",
            });

        }
        
        const tagDetails=await Category.findById(category);
        if(!tagDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Tag Not Found",
            });
        }

        const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            Category:tagDetails._id,
            tag,
            thumbnail:thumbnailImage.secure_url,
            status: status,
			instructions: instructions,
			
        })

        const updatedUser= await User.findByIdAndUpdate(
            {_id:instructorDetails._id },                                   
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
            );

        const updatedTag= await Category.findByIdAndUpdate({_id:category},
            {
                $push:{
                    courses: newCourse._id,
                }
            },{new:true})
        
        return res.status(200).json({
            success:true,
            message:"Course added successfully",
            data:newCourse,
        })

       
    }
    catch(err)
    {
        console.error(err.message);
        return res.status(400).json({
            success:false,
            message:"Course Creation Failed",
        });
    }

}


exports.getAllCourses=async (req,res)=>{
    try{
        const courses=await Course.find({},{courseName:true}).populate("instructor").exec();
        res.status(200).json({
            success:true,
            message:"All Courses Fetched",
            data:courses,
        })
    }
    catch(err)
    {
        console.error(err.message);
        return res.status(400).json({
            success:false,
            message:"Get all Courses failed",
            error:err.message,
        });
    }

}


exports.getCourseDetails=async (req,res)=>{
    try {
		const {courseId}=req.body;
	const courseDetails=await Course.find({_id: courseId}).populate({path:"instructor",
	populate:{path:"additionalDetails"}})
	.populate("category")
	.populate({                    //only populate user name and image
		path:"ratingAndReviews",
		populate:{path:"user"
		,select:"firstName lastName accountType image"}
	})
	.populate({path:"courseContent",populate:{path:"subSection"}})
	.exec();

	if(!courseDetails){
		return res.status(404).json({
            success:false,
            message:"Course Not Found"
        })
	}
	return res.status(200).json({
        success:true,
		message:"Course fetched successfully now",
        data:courseDetails
    });
		
	} catch (error) {
		console.log(error);
        return res.status(404).json({
            success:false,
			message:`Can't Fetch Course Data`,
			error:error.message
        })
		
	}
}