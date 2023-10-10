const Tag=require("../models/Tags");

exports.createTag=async (req,res)=>{
    try{
        const {name,description}=req.body;
        if(!name || !description)
        {
            return res.status(400).json({
                success:false,
                message:"All Fields Required",
            });
        }
        const tagDetails= await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
        });

    }
    catch(err)
    {
        console.error(err.message);
        return res.status(400).json({
            success:false,
            message:"Tag Controller Failed",
        });
    }

}


exports.showAllTags=async (req,res)=>{
    try{
        const allTags=await Tag.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All tags returned Successfully",
            allTags,
        })
    }
    catch(err)
    {
        console.error(err.message);
        return res.status(400).json({
            success:false,
            message:"All Tags Failed",
        });
    }
}