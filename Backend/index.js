const express=require("express");
const app=express();

require("dotenv").config();

require("./config/database").connect();

require("./config/cloudinary").connect();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const courseRoutes=require("./routes/Course");
const contactUsRoutes=require("./routes/ContactUs");





