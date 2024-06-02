import React from "react";
import Footer from "../../src/components/common/Footer";
import ContactUsForm from "../components/contactUs/ContactUsForm";
import { BsFillChatRightFill } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import { FaGlobeAfrica } from "react-icons/fa";
const ContactUs = () => {
  return (
    <div className="flex flex-col gap-4 mt-20">
      <div className="flex flex-row justify-center gap-14">
        <div className="bg-[#161D29] md:flex flex-col gap-5 w-[30%] p-10 h-[30%] rounded-lg hidden">
          <div className="flex flex-row items-center gap-4 text-xl">
            <BsFillChatRightFill className="text-[#AFB2BF] text-xl" />
            <div className="flex flex-col gap-1">
              <p className="text-[#F1F2FF] text-md font-semibold">Chat on us</p>
              <p className="text-[#999DAA] font-inter">
                Our friendly team is here to help.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 text-xl">
            <FaGlobeAfrica className="text-[#AFB2BF] text-xl" />
            <div className="flex flex-col gap-1">
              <p className="text-[#F1F2FF] text-md font-semibold">Visit Us</p>
              <p className="text-[#999DAA] font-inter">
                Come and say hello at our office HQ.
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4 text-xl">
            <IoCallSharp className="text-[#AFB2BF] text-xl" />
            <div className="flex flex-col gap-1">
              <p className="text-[#F1F2FF] text-md font-semibold">Call Us</p>
              <p className="text-[#999DAA] font-inter">
                Mon - Fri From 8am to 5pm
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:w-[40%] w-[70%]">
          <h1 className="text-4xl font-semibold text-[#F1F2FF]">
            Got an Idea? We’ve got the skills. Let’s team up
          </h1>
          <p className="text-center text-richblack-300 mt-2">
            Talk us more about yourself and what you’ve got in mind.
          </p>

          <ContactUsForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
