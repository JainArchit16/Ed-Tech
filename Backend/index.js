const express=require("express");
const app=express();

require("dotenv").config();

require("./config/database").connect();

const route=require("./routes/route");

app.use("/api/v1",route);