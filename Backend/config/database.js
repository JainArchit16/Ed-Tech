const mongoose=require("mongoose");

require("dotenv").config();

exports.connect=() =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((err)=>{
        
        console.error(err);
        console.log("DB Connection Error")
    })
    
}
