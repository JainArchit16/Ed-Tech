const mailSender=require("../utils/mailSender");
require("dotenv").config();

exports.contactUs=async (req,res)=>{
    try{
        const { firstName, lastName, email, message, phoneNo } = req.body;
        if (!firstName || !email || !message) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        const replyUser=mailSender(email,"Thanks For Contacting Us","Your Response Have Been Recorded");
        const data={
            firstName,
            lastName: `${lastName ? lastName : "null"}`,
            email,
            message,
            phoneNo: `${phoneNo ? phoneNo : "null"}`,
        }

        const replyAdmin=mailSender(process.env.ADMIN_EMAIL,"Enquiry",`<html><body>${
            Object.keys(data).map((key) => {
                return `<p>${key} : ${data[key]}</p>`;
            })
        }</body></html>`)

        if(replyAdmin)
        {
            return res.status(200).send({
                success: true,
                message: "Your message has been sent successfully",
            });
        }
    }


    catch(error)
    {
        return res.status(403).send({
            success: false,
            message: "Something went wrong",
        });
    }
}