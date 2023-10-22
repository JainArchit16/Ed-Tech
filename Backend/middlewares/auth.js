const jwt=require("jsonwebtoken");
require("dotenv").config();
const User=require("../models/User");


// Glti yahan hogi agaar role mien chck krlena 


exports.auth=async (req,res,next)=>{
    try{

    const token=req.body.token ||  req.cookies.token || req.header("Authorization").replace("Bearer ","");
    if(!token)
    {
        return res.status(401).json({
            message:"No token Found",
            success:false,
        })
    }
    // console.log(token);
    try{
        let decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
    }
    catch(err)
    {
        return res.status(401).json({
            success:false,
            message:"Token Not Verifed",
        })
    }
    next();
    }
    catch(error)
    {
        console.error(error.message);
        return res.status(401).json({
            success:false,
            message:"Something went Wrong in Auth",
            
        })
    }
    
}

exports.isStudent=(req,res,next)=>{

    try{

        let role=req.user.role
        if(role!=="Student")
        {
            return res.status(400).json({
                message:"Protected Route for Students",
                success:false,
            })
        }
        next();
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong in Student path",
        })
    }
   
}


exports.isAdmin=(req,res,next)=>{

    try{

        let role=req.user.role
        if(role!=="Admin")
        {
            return res.status(400).json({
                message:"Protected Route for Admin",
                success:false,
            })
        }
        next();
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong in Admin path",
        })
    }
   
}


exports.isInstructor=(req,res,next)=>{

    try{

        let role=req.user.role
        if(role!=="Instructor")
        {
            return res.status(400).json({
                message:"Protected Route for Instructor",
                success:false,
            })
        }
        next();
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            message:"Something went Wrong in Instructor path",
        })
    }
   
}