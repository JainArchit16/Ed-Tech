import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Errorpage from "./pages/Errorpage";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Setting from "./components/core/Dashboard/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import Snowfall from "react-snowfall";
import React, { useState, useEffect } from "react";


function App() {
  const { user } = useSelector((state) => state.profile);
  const [showSnow, setShowSnow] = useState(false);

    // 2. Handle "Winter Only" Logic
  useEffect(() => {
    const month = new Date().getMonth();
    // Month 11 = Dec, 0 = Jan, 1 = Feb.
    // This logic removes snow automatically when April (3) starts.
    if (month === 11 || month <= 2) {
      setShowSnow(true);
    } else {
      setShowSnow(false);
    }
  }, []);

  return (
    <>
    {showSnow && (
            <Snowfall
              snowflakeCount={40}
              color="#fbfbfb"
              style={{
                position: "fixed",
                width: "100vw",
                height: "100vh",
                zIndex: 9999,
              }}
            />
          )}
    <div className="w-full h-fit flex flex-col bg-richblack-900 font-inter">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
        <Route path="/verifyemail" element={<VerifyEmail />}></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/catalog/:catalogName" element={<Catalog />}></Route>
        <Route path="/courses/:courseId" element={<CourseDetails />}></Route>

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="my-profile" element={<MyProfile />}></Route>
          <Route path="settings" element={<Setting />}></Route>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="enrolled-courses"
                element={<EnrolledCourses />}
              ></Route>
              <Route path="cart" element={<Cart />}></Route>
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourse />}></Route>
              <Route path="my-courses" element={<MyCourses />}></Route>
              <Route
                path="edit-course/:courseId"
                element={<EditCourse />}
              ></Route>
              <Route path="instructor" element={<Instructor />}></Route>
            </>
          )}
        </Route>

        <Route path="*" element={<Errorpage />}></Route>

        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              ></Route>
            </>
          )}
        </Route>
      </Routes>
    </div>
      </>
  );
}

export default App;
