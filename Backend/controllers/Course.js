const Tag=require("../models/Tags");
const User=require("../models/User");
const Course=require("../models/Course");
const {uploadImage}=require("../utils/imageUploader");

//nsfs-037
exports.createCourse=async (req,res)=>{

    try{
        const {user}=req.user;
        const instructorDetails=await User.findById(user.id);

        const {courseName,courseDescription,whatYouWillLearn,price,tag}=req.body;

        const thumbnail=req.files.thumbnailImage;

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields Required",
            });
        }

        if(!instructorDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor Not Found",
            });

        }
        
        const tagDetails=await Tag.findById(tag);
        if(!tagDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Tag Not Found",
            });
        }

        const thumbnailImage=await uploadImage(thumbnail,process.env.FOLDER_NAME);

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })

        const updatedUser= await User.findByIdAndUpdate(
            {_id:instructorDetails._id },                                      //why not instructorDetails._id
            {
                $push:{
                    courses: newCourse._id,
                }
            },
            {new:true},
            );

        const updatedTag= await Tag.findByIdAndUpdate({_id:tag},
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


exports.getAllCourse=async (req,res)=>{
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