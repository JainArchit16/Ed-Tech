const mongoose = require("mongoose"); 
const mailSender=require("../utils/mailSender");
const otpTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 60 * 5, 
	},
});


async function sendVerificationEmail(email,otp)
{
	try{
		let info=await mailSender(email,"Verification Mail from Study Notion",otpTemplate(otp));
		console.log(info);
	}
	catch(err)
	{
		console.error(err);
	}
}

OTPSchema.pre("save",async function(next)
{
	await sendVerificationEmail(this.email,this.otp);
	next();
})

module.exports = mongoose.model("OTP", OTPSchema);
