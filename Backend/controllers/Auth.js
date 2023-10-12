const Profile=require("../models/Profile");
const otpGenerator=require("otp-generator");
const OTP=require("../models/OTP");
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const sendMail=require("../utils/mailSender");

require("dotenv").config();


exports.sendOTP=async (req,res)=>{

    try
    {
        const {email}=req.body;

        if(await User.findOne({email}))
        {
            return res.status(401).json({
                message:"User Already Exists",
                success:false,
            })
        }
        var otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP Generated ",otp);
        const result=await OTP.findOne({otp:otp});
        while(result)
        {
            otp=otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            }); 
            result=await OTP.findOne({otp:otp});

        }


        const otpPayload={email,otp};

        const otpBody=await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            message:"OTP sent successfully",
            success:true,
            otp,
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
    

}





exports.signup=async (req,res)=>{
    try{
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            otp,
        }=req.body;

        if( !firstName  ||
            !lastName   ||
           !email       ||
            !password   ||
            !confirmPassword||
            !otp)
        {
            return res.status(403).json({
                message:"All fields are Required",
                success:false,
            })
        }

        if(password!==confirmPassword)
        {
            return res.status(400).json({
                message:"Passowrd Doesn't Match",
                success:false,
            })
        }

        const result= await User.findOne({email});

        if(result)
        {
            return res.status(400).json({
                message:"Already Registered User",
                success:false,
            })
        }
        // console.log(otp);
        const recentOTP=await OTP.find({email:email}).sort({createdAt:-1}).limit(1);
        if(recentOTP.length == 0)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"OTP Expired",
                })
        }
        // console.log("recent one is",recentOTP[0].otp);
        if(recentOTP[0].otp !== otp)
        {
            return res.status(400).json(
            {
                success:false,
                message:"Wrong OTP",
            })
        }
        // if(recentOTP[0].otp === otp)
        // {
        //     return res.status(400).json(
        //     {
        //         success:true,
        //         message:"OTP",
        //     })
        // }

        let hashedPassword=await bcrypt.hash(password,10);
        let profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })
       let user=await User.create({
            accountType,
            firstName,
            lastName,
            email,
            password:hashedPassword,
            contactNumber,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
       })
       return res.status(200).json({
        message:"User Created Successfully",
        user,
        success:true,
       })
    }
    catch(err)
    {
        return res.status(500).json({
            message:"Failed signUp",
            success:false,

        })
    }

}









exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(403).json({
                message:"All fields Are Required",
                success:false,
            })
        }
        let user=await User.find({email}).populate("additionalDetails").exec();
        user=user[0];
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"No User Exist",
            })
        }
        
        if(await bcrypt.compare(password,user.password))
        {
            const payload={
                email:user.email,
                id:user._id,
                role:user.accountType,
            }
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user.token=token;
            user.password=undefined;

            res.cookie("token",token,{
                
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,

            }).status(200).json({
                success:true,
                message:"User Logged In",
                user,
            })
        }
        else
        {
            return res.status(401).json({
                message:"wrong Password",
                success:false,
            })
        }


    }
    catch(err)
    {
        console.error(err.message);
        return res.status(500).json({
            message:"Login Failure",
            success:false,
        })
        
    }
}


exports.changePassword=async (req,res)=>{
    try{
        const {oldPassword,newPassword,confirmNewPassword}=req.body;
        if(!oldPassword || !newPassword || confirmNewPassword)
        {
            return res.status(400).json({
                message:"All Fields Required",
                success:false,
            })
        }
        if(newPassword!==confirmNewPassword)
        {
            return res.status(400).json({
                message:"Passowrd Doesnot match",
                success:false,
            })
        }

        const userDetails = await User.findById(req.user.id);

        const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);

        if(!userDetails)
        {
           return res.status(500).json({
            success:false,
            message:"No user Exist",
           }) 
        }
        if(oldPassword === newPassword){
			return res.status(400).json({
				success: false,
				message: "New Password cannot be same as Old Password",
			});
		}

        if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

        const hashedPassword=await bcrypt.hash(newPassword,10);
        const updatedUser=User.findOneAndUpdate(req.user.id,{
            password:hashedPassword,
        },
        {new:true});

        try{


            const info=await sendMail(updatedUser.email,
            "Passowrd Changed",
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`);
            console.log("Email sent successfully:", emailResponse.response);

        }
        catch (error) {

			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

        
    }
    catch(error)
    {
        console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
    }
}