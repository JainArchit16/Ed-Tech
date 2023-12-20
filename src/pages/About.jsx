import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Stats from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../../src/components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const About = () => {
  return (
    <div className="bg-richblack-900 flex flex-col h-[100%]">
      <div className="bg-[#161D29] flex flex-col w-full h-[50%] items-center relative">
        <div className="flex flex-col w-[70%] justify-center items-center my-24">
          <p className="text-richblack-5 text-4xl font-semibold font-inter w-[70%] text-center mb-10">
            Driving Innovation in Online Education for a
            <HighlightText text={" Brighter Future"} />
          </p>
          <p className="text-lg font-inter text-[#838894] text-center mb-10">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
          <div className="flex flex-row justify-center items-center gap-8 absolute translate-y-[85%]">
            <img src={image1} alt="xyz" />
            <img src={image2} alt="xyz" />
            <img src={image3} alt="xyz" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-52 border-b-[1px] border-richblack-500">
        <div className="text-white text-4xl font-inter text-semibold text-center my-10 w-[75%]">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighlightText text={"combines technology"} />,
          <HighlightText text={" expertise"} />, and community to create an
          unparalleled educational experience.
        </div>
      </div>
      <div className="flex flex-row justify-center items-center w-full gap-40 my-20">
        <div className="w-[40%] text-white flex flex-col gap-4">
          <h1 class="text-4xl font-semibold font-inter relative">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
              Our Founding Story
            </span>
          </h1>

          <p className="text-md text-[#838894]">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </p>
          <p className="text-md text-[#838894]">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </p>
        </div>
        <div>
          <img
            className="shadow-[0_0_20px_0] shadow-[#FC6767]"
            src={FoundingStory}
            alt="xyz"
          />
        </div>
      </div>

      <div className="flex flex-row justify-center items-center w-full gap-80 my-40">
        <div className="w-[30%] flex flex-col gap-8">
          <h1 class="text-4xl font-semibold font-inter relative">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#E65C00] to-[#F9D423]">
              Our Vision
            </span>
          </h1>

          <p className="text-md text-[#838894]">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </p>
        </div>
        <div className="w-[30%] flex flex-col gap-8">
          <h1 class="text-4xl font-semibold font-inter relative">
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
              Our Mission
            </span>
          </h1>
          <p className="text-md text-[#838894]">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </p>
        </div>
      </div>

      <Stats />

      <LearningGrid />
      <ContactFormSection />
      <h2 className="text-center text-4xl font-semobold mt-10 text-richblack-5">
        Review From Other Learners
      </h2>
      <ReviewSlider />
      <Footer />
    </div>
  );
};

export default About;
