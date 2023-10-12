const Profile=require('../models/Profile');
const User=require("../models/User");
const Course=require("../models/Course");
const { uploadImageToCloudinary } = require('../utils/imageUploader');

exports.updateProfile=async (req,res)=>{

    try
    {
        const user=req.user;
        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        
        const userDetails=await User.findById({_id:user.id});
        // console.log(userDetails);


        const profile = await Profile.findById({_id:userDetails.additionalDetails});

		// Update the profile fields
		profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
		profile.about = about || profile.about;
		profile.gender=gender || profile.gender;
		profile.contactNumber = contactNumber || profile.contactNumber;

        await profile.save();

        return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
    }
    catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}

}

exports.deleteAccount=async (req,res)=>{
    try
    {
        const userId=req.user.id;
        console.log(userId);
        if(!userId)
        {
            return res.status(500).json({
                success:false,
                message:"User not found",
            })
        }
        const user=await User.findById({_id:userId});

        if(!user)
        {
            return res.status(500).json({
                success:false,
                message:"User not found",
            })
        }
        console.log(user.additionalDetails);
        await Profile.findByIdAndDelete({_id:user.additionalDetails});
        

        for (const courseId of user.courses) {
            await Course.findByIdAndUpdate(
              courseId,
              { $pull: { studentsEnroled: id } },
              { new: true }
            )
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
        await User.findByIdAndDelete({_id:userId});


        //enroll number decrease code

        res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});

    }
    catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "User Cannot be deleted successfully",error:error.message });
	}

}

exports.getEnrolledCourses=async (req,res) => {
	try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getUserDetails=async (req,res)=>{
    try{
        const userId=req.user.id;
        if(!userId)
        {
            return res.status(500).json({
                success:false,
                message:"User not found",
            })
        }
        const userDetails=await User.findById({_id:userId}).populate("additionalDetails").exec();
        return res.status(200).json({
            success: true,
			message: "User Fetched successfully",
            data: userDetails,
        })
    }
    catch(error)
    {
        console.log(error);
		res
			.status(500)
			.json({ success: false, 
                message: "User Cannot be Fetched",
                error:error.message });
	}
    
}

exports.updateDisplayPicture=async (req,res)=>{
    try
    {
        const userId=req.user.id;

        let user=await User.findById({_id:userId});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const image=req.files.pfp;
        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
            });
        }
        const response=await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
        user=await User.findByIdAndUpdate({_id:userId},{
            image:response.secure_url
        },{new:true})
        res.status(200).json({
            success: true,
            message: "Image updated successfully",
            user,
        });

    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.instructorDashboard = async (req, res) => {
	try {
		const id = req.user.id;
		const courseData = await Course.find({instructor:id});
		const courseDetails = courseData.map((course) => {
			totalStudents = course?.studentsEnrolled?.length;
			totalRevenue = course?.price * totalStudents;
			const courseStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudents,
				totalRevenue,
			};
			return courseStats;
		});
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}