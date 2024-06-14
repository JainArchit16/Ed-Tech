import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
} from "../../../slices/viewCourseSlice";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    return () => {
      dispatch(setCourseSectionData([]));
      dispatch(setEntireCourseData([]));
      dispatch(setCompletedLectures(0));
    };
  }, []);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (sec) => sec._id === sectionId
      );
      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ].subSection.findIndex((subSec) => subSec._id === subSectionId);

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(
        courseSectionData?.[currentSectionIndex].subSection?.[
          currentSubSectionIndex
        ]?._id
      );
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const toggle = (courseId) => {
    if (activeStatus === courseId) {
      setActiveStatus("");
      return;
    }
    setActiveStatus(courseId);
  };

  return (
    <div>
      <div className="md:hidden fixed top-4 left-4 z-[100]">
        <button
          className="p-2 bg-richblack-100 text-richblack-800 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoClose size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <div
        className={`fixed top-0 z-[90] h-full w-full bg-richblack-800 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:translate-x-0 md:flex md:w-[320px] md:max-w-[350px] md:flex-col md:border-r-[1px] md:border-r-richblack-700 md:bg-richblack-800 md:h-screen`}
      >
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="md:flex w-full items-end md:items-center justify-between hidden">
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90 "
              title="back"
            >
              <IoIosArrowBack size={20} />
            </div>
            <div>
              <IconBtn text="Add Review" onClick={() => setReviewModal(true)} />
            </div>
          </div>
          <div className="flex flex-col mt-12 md:mt-0">
            <p>{courseEntireData?.courseName} </p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>
        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => toggle(course?._id)}
              key={index}
            >
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>
              <div>
                {activeStatus === course?._id && (
                  <div>
                    {course.subSection.map((topic, index) => (
                      <div
                        className={`flex gap-3  px-5 py-2 ${
                          videoBarActive === topic._id
                            ? "bg-yellow-200 font-semibold text-richblack-800"
                            : "hover:bg-richblack-900"
                        }`}
                        key={index}
                        onClick={() => {
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                          );
                          setVideoBarActive(topic?._id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures.includes(topic?._id)}
                          onChange={() => {}}
                        />
                        <span>{topic.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default VideoDetailsSidebar;
