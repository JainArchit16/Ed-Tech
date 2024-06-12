import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "../AddCourse/CourseBuilder/CourseBuilderForm";
import Index from "../AddCourse/PublishCourse/index";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row w-full justify-between gap-4 sm:gap-0">
        {steps.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-3 ${
              step === item.id ? "block" : "hidden sm:flex"
            }`}
          >
            <div
              className={`${
                item.id === step || step > item.id
                  ? "bg-yellow-50 text-black"
                  : "bg-[#161D29] text-[#838894]"
              } 
              rounded-full p-2 h-[60px] w-[60px] 
              flex flex-col justify-center items-center text-xl`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
            <p
              className={`${
                item.id === step ? "text-[#F1F2FF]" : "text-[#585D69]"
              } text-center`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <Index />}
      </div>
    </>
  );
};

export default RenderSteps;
