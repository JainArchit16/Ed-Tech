import React from "react";

const stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

const Stats = () => {
  return (
    <div className="md:flex flex-row w-full justify-center items-center bg-[#161D29] border-[1px] border-[#2C333F] hidden">
      <div className="flex flex-row w-[80%] md:gap-36 lg:gap-44 justify-center items-center">
        {stats.map((element, index) => (
          <div key={index} className="flex flex-col gap-2 my-10">
            <p className="font-inter text-4xl text-white">{element.count}</p>
            <p className="text-[#585D69] font-inter font-semibold text-md">
              {element.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
