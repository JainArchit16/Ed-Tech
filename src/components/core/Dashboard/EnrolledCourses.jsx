import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEnrolledCourses } from "../../../services/operations/profileAPI";
import Loader from "../../common/Loader";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link } from "react-router-dom";

const EnrolledCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourse = async () => {
    try {
      const response = await getEnrolledCourses(user, token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log(error.message());
    }
  };

  useEffect(() => {
    getEnrolledCourse();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col gap-4 text-white">
        <h1 className="text-xl md:text-2xl text-white font-inter">
          Enrolled Courses
        </h1>

        {!enrolledCourses ? (
          <Loader />
        ) : !enrolledCourses.length ? (
          <p>You Have Not Enrolled In any Course</p>
        ) : (
          <div className="w-full md:w-[90%]">
            <div className="flex flex-col md:flex-row bg-[#2C333F] text-[#C5C7D4] justify-between p-4 rounded-md">
              <p className="w-full md:w-[40%]">Course Name</p>
              <p className="w-full md:w-[30%]">Duration</p>
              <p className="w-full md:w-[20%]">Progress</p>
              <div className="w-full md:w-[20%]"></div>
            </div>
            {enrolledCourses.map((elem, index) => (
              <Link
                key={index}
                to={`/view-course/${elem?._id}/section/${elem.courseContent?.[0]?._id}/sub-section/${elem.courseContent?.[0]?.subSection?.[0]?._id}`}
              >
                <div
                  className="flex flex-col md:flex-row justify-between px-4 md:px-6 items-center border-[1px] border-[#2C333F] py-4 border-t-0"
                  key={index}
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center w-full md:w-[40%]">
                    <img
                      alt="thumbnail"
                      src={elem.thumbnail}
                      className="rounded-md w-[42px] h-[42px] md:w-[52px] md:h-[52px]"
                    />
                    <div className="flex flex-col items-start md:items-start">
                      <div className="text-md md:text-lg">
                        {elem.courseName}
                      </div>
                      <div className="text-sm md:text-md text-[#838894] w-full md:w-[80%]">
                        {elem.courseDescription}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-[30%] mt-2 md:mt-0 md:ml-8">
                    {elem?.courseDuration}
                  </div>
                  <div className="flex flex-col gap-2 md:gap-3 w-full md:w-[20%] mt-2 md:mt-0">
                    <div>Progress: {elem.progressPercentage || 0} %</div>
                    <ProgressBar
                      completed={elem.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                    />
                  </div>

                  <div className="w-full md:w-[20%] mt-2 md:mt-0"></div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
