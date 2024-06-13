import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    subHeading: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    subHeading: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    subHeading: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    subHeading: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="w-11/12 flex flex-col lg:flex-row gap-10 lg:gap-28 justify-center mx-auto p-6 lg:p-12 my-2">
      <div className="flex flex-col gap-10 lg:gap-20">
        {timeline.map((element, index) => {
          return (
            <div
              className="flex flex-row gap-4 lg:gap-6 items-center w-full"
              key={index}
            >
              <div className="relative">
                <img
                  src={element.Logo}
                  className="z-50 relative"
                  alt={element.heading}
                />
                <div className="bg-white rounded-full w-12 h-12 lg:w-14 lg:h-14 absolute -top-2 lg:-top-4 -left-4 lg:-left-6 shadow-lg"></div>
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-md lg:text-lg">
                  {element.heading}
                </p>
                <p className="text-sm lg:text-base">{element.subHeading}</p>
              </div>
              {index < timeline.length - 1 && (
                <div className="w-px h-12 lg:h-20 border-dotted border-l-2 border-[#AFB2BF] relative top-8 lg:top-20 hidden lg:block -left-full"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative shadow-blue-200 mx-auto">
        <img
          src={TimelineImage}
          alt="Timeline"
          className="rounded-md object-cover z-20 relative"
        />
        <div
          className="w-44 h-44 opacity-[60%] blur-3xl top-4 lg:top-6 bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4] absolute
            rounded-full z-10"
        ></div>
        <div className="bg-[#014A32] w-72 md:w-[480px] h-20 justify-between px-4 lg:px-6 mx-auto -bottom-6 left-2 lg:-bottom-10 right-8 lg:right-24 absolute z-30 flex flex-row gap-6 lg:gap-14 items-center">
          <div className="flex flex-row items-center gap-2 md:gap-6">
            <p className="text-[#FFFFFF] text-xl lg:text-3xl font-bold">10</p>
            <p className="text-[#05A77B] text-xs lg:text-base">
              YEARS <br />
              EXPERIENCES
            </p>
          </div>
          <div className="bg-[#037957] w-px h-8 lg:h-[45px] z-40"></div>
          <div className="flex flex-row items-center gap-2 md:gap-6">
            <p className="text-[#FFFFFF] text-xl lg:text-3xl font-bold">250</p>
            <p className="text-[#05A77B] text-xs lg:text-base">
              TYPES OF <br />
              COURSES
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
