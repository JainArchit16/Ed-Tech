const Profile=require('../models/Profile');
const User=require("../models/User");
const Course=require("../models/Course");

exports.updateProfile=async (req,res)=>{

    try
    {
        const user=req.user;
        const {gender,dateOfBirth="",about="",contactNumber}=req.body;
        
        const userDetails=User.findById(user.id);



        const profile = await Profile.findById(userDetails.additionalDetails);

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

        if(!userId)
        {
            return res.status(500).json({
                success:false,
                message:"User not found",
            })
        }

        const profileId=await User.findById({userId}).additionalDetails;
        await Profile.findByIdAndDelete({_id:profileId});
        const courseIds= await User.findById({_id:userId}).courses;

        //There Can be Error in it 
        for (const courseId of courseIds) {
            const course = await Course.findById(courseId);
            if (course) {
                const indexOfUser = course.enrolledUsers.indexOf(userId);
                if (indexOfUser !== -1) {
                    course.enrolledUsers.splice(indexOfUser, 1);
                    await course.save();
                }
            }
        }
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