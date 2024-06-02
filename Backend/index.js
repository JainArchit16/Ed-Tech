const express = require("express");
const app = express();

require("dotenv").config();

require("./config/database").connect();

require("./config/cloudinary").connect();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const userRoute = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const contactUsRoutes = require("./routes/ContactUs");
const paymentRoute = require("./routes/Payment");

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/auth", userRoute);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/contact", contactUsRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is Running",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
