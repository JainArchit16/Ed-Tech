const otpGenerator=require("otp-generator");
const OTP=require("../models/OTP");
const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
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
            !contactNumber||
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
        
        const recentOTP=OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);
        
        if(recentOTP.length ==0)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"OTP Expired",
                })
        }

        if(recentOTP!==otp)
        {
            return res.status(400).json(
            {
                success:false,
                message:"Wrong OTP",
            })
        }


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
        const user=await User.find({email}).populate("additionalDetails");
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

        const user=await User.findOne()
    }
    catch(err)
    {
        console.error(err.message);
    }
}