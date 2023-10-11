const instance=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");


exports.capturePayment=async (req,res)=>{
    try{
        const {courseId}=req.body; 
        const {userId}=req.user.id;

        if(courseId)
        {
            return res.status(400).json({
                success:false,
                message:"Provide Valid Course",
            })
        }
        const course=await Course.findById({courseId});

        if(!course)
        {
            return res.status(400).json({
                success:false,
                message:"User Not Found",
            })
        }
        userId=new mongoose.Types.ObjectId(userId);

        if(course.studentsEnrolled.includes(userId))
        {
            return res.status(400).json({
                success:false,
                message:"Course Already Bought",
            })
        }

        const amount=course.price;
        const currency="INR";

        const options={
            amount:amount*100,
            currency,
            reciept:Math.random(Date.now()).toString(),
            notes:{
                courseId:courseId,
                userId,
            }
        }

        try{
            const paymentResponse=await instance.orders.create(options);
            console.log(paymentResponse);
            return res.status(200).json({
                success:true,
                thumbnail:course.thumbnail,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount,
            })

        }
        catch(err)
        {
            console.error(err.message);
            return res.status(500).json({
                success:false,
                message:"Could Not Initiate Payment",
            })
        }

    }
    catch(err)
    {
        console.error(err.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
};

exports.verifySignature=async (req,res)=>{
    const webhookSecret="12345678";

    const signature=req.headers["x-razorpay-signature"];

    const shasum=await crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature===digest)
    {
        console.log("Payment is Authorized");
        const {userId,courseId}=req.body.payload.payment.entity.notes;

        try{

            const updatedUser=await User.findByIdAndUpdate({_id:userId},
                {
                    $push:{
                        courses:courseId
                    }
                },{new:true})
    
            const updatedCourse=await Course.findByIdAndUpdate({_id:courseId},
                {
                    $push:{
                        studentsEnrolled:userId
                    }
                },{new:true});
                
                
                console.log(updatedCourse);
                console.log(updatedUser);

                const emailResponse=mailSender(updatedUser.email,
                    "Congratulations, Course Purchased Successfully",
                    "Fuck Off");
                console.log(emailResponse);
                return res.status(200).json({
                    success:true,
                    message:'Payment successful',
                });
        }
        catch(err)
        {
            console.error(error);
                        return res.status(500).json({
                            success:false,
                            message:error.message,
                        });
        }
    }
    else
    {
        return res.status(400).json({
            success:false,
            message:"Invalid Signature",
        })
    }


};

