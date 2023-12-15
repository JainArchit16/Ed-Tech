import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import CourseTable from "./InstructorCourses/CourseTable";
import { VscAdd } from "react-icons/vsc";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      let result = await fetchInstructorCourses(token);
      // console.log(result);
      if (result) setCourses(result);
    };
    fetchCourses();
  }, []);

  return (
    <div className="mx-10 w-[90%] my-5">
      <div className="mb-14 flex items-center justify-between">
        <h1 className=" text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
