import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import videoUrl from "../assets/Images/banner.mp4";
import Codeblocks from "../components/core/HomePage/Codeblocks";
import Footer from "../components/common/Footer";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import BecomeInstructor from "../components/core/HomePage/BecomeInstructor";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      <div className="relative flex flex-col mx-auto w-11/12 justify-between text-white items-center">
        <Link to={"/signup"}>
          <div className=" group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit max-w-maxContent">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] text-richblack-200 transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="font-semibold text-4xl mt-7">
          Empower Your Future With{" "}
          <HighlightText text={"Coding Skills"}></HighlightText>
        </div>
        <div className="w-[65%] mt-6 text-richblack-400 text-lg text-center">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row mt-8 gap-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton linkto={"/login"}>Book a demo</CTAButton>
        </div>
        <div className="my-12 flex justify-center relative">
          <video
            muted
            loop
            autoPlay
            className="w-[75%] h-[20%] z-10 shadow-[15px_15px_0_0] shadow-white-50"
          >
            <source src={videoUrl} type="video/mp4"></source>
          </video>
        </div>
        <div className="mx-32">
          <Codeblocks
            position={"flex-row"}
            heading={
              <div className="text-xl">
                Unlock Your {"  "}
                <HighlightText text={"Coding Potential"}></HighlightText>
                {"  "}with our online Courses
              </div>
            }
            ctabtn1={{
              btnText: "Try It Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            codeblock={
              '<!DOCTYPE html> \n <html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>'
            }
            codeColor={"text-yellow-25"}
          ></Codeblocks>

          <Codeblocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                {" "}
                Start
                {"  "}
                <HighlightText text={"coding in seconds"} />
                {"  "}
              </div>
            }
            subHeading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
            codeColor={"text-white-25"}
          />
        </div>
        <div className="mx-auto flex flex-col justify-between items-center relative w-full h-[30rem]">
          <ExploreMore />
        </div>
      </div>

      <div className="w-full bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 flex flex-col justify-between items-center gap-4 mx-auto">
            <div className="flex flex-row w-11/12 gap-4 justify-center mt-32">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex flex-row items-center gap-2">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton linkto={"/signup"}>Learn More</CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 flex flex-row gap-12 justify-center mx-auto p-12 my-6">
          <div className="w-[40%] text-2xl">
            Get the skills you need for a{" "}
            <HighlightText text={"job that is in demand."} />
          </div>
          <div className="w-[40%] flex flex-col gap-10 text-lg">
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills.
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
          </div>
        </div>

        <TimelineSection />
        <LearningLanguageSection />
      </div>
      <BecomeInstructor />

      <h2 className="text-center text-4xl font-semobold mt-10 text-richblack-5">
        Review From Other Learners
      </h2>
      <ReviewSlider />

      <Footer />
    </div>
  );
};

export default Home;
