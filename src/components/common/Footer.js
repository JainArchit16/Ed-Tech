import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className="w-full bg-[#161D29] flex flex-col justify-center items-center p-8">
      <div className="w-full flex flex-col md:flex-row gap-10 md:gap-20 p-5 md:p-20 justify-center items-center md:items-start">
        <div className="flex flex-col gap-3 items-center md:items-start">
          <img src={Logo} alt="Logo" className="w-32 md:w-48" />
          <p className="font-semibold font-inter text-[#AFB2BF] my-1">
            Company
          </p>
          <div className="text-[#6E727F] font-inter flex flex-col items-center md:items-start">
            {["About", "Career", "Affiliates"].map((element, index) => (
              <Link key={index} to={element.split(" ").join("-").toLowerCase()}>
                <p className="my-1 hover:text-richblack-50 transition-all duration-200 cursor-pointer">
                  {element}
                </p>
              </Link>
            ))}
          </div>
          <div className="flex flex-row gap-3 text-lg text-[#6E727F]">
            <FaFacebook className="hover:text-richblack-50 transition-all duration-200" />
            <FaGoogle className="hover:text-richblack-50 transition-all duration-200" />
            <FaTwitter className="hover:text-richblack-50 transition-all duration-200" />
            <FaYoutube className="hover:text-richblack-50 transition-all duration-200" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold font-inter text-[#AFB2BF] my-3">
            Resources
          </p>
          <div className="text-[#424854] font-inter flex flex-col items-center md:items-start">
            {Resources.map((element, index) => (
              <Link key={index} to={element.split(" ").join("-").toLowerCase()}>
                <p className="my-1 text-[#6E727F] hover:text-richblack-50 transition-all duration-200 cursor-pointer">
                  {element}
                </p>
              </Link>
            ))}
            <p className="font-semibold font-inter text-[#AFB2BF] my-3">
              Support
            </p>
            <div className="text-[#6E727F] font-inter">
              <p className="my-1 hover:text-richblack-50 transition-all duration-200 cursor-pointer">
                Help Center
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold font-inter text-[#AFB2BF] my-3">Plans</p>
          <div className="text-[#424854] font-inter flex flex-col items-center md:items-start">
            {Plans.map((element, index) => (
              <Link key={index} to={element.split(" ").join("-").toLowerCase()}>
                <p className="my-1 text-[#6E727F] hover:text-richblack-50 transition-all duration-200 cursor-pointer">
                  {element}
                </p>
              </Link>
            ))}
          </div>

          <p className="font-semibold font-inter text-[#AFB2BF] my-3">
            Community
          </p>
          <div className="text-[#424854] font-inter flex flex-col items-center md:items-start">
            {Community.map((element, index) => (
              <Link key={index} to={element.split(" ").join("-").toLowerCase()}>
                <p className="my-1 text-[#6E727F] hover:text-richblack-50 transition-all duration-200 cursor-pointer">
                  {element}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden md:block w-[2px] bg-[#2C333F] h-full"></div>

        {FooterLink2.map((element, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:items-start"
          >
            <p className="font-semibold font-inter text-[#AFB2BF] my-3">
              {element.title}
            </p>
            <div className="text-[#424854] font-inter flex flex-col items-center md:items-start">
              {element.links.map((element1, idx) => (
                <Link key={idx} to={element1.link}>
                  <p className="my-1 text-[#6E727F] hover:text-richblack-50 transition-all duration-200">
                    {element1.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#2C333F] w-full h-[1px]"></div>

      <div className="flex flex-col md:flex-row my-4 justify-between items-center w-full md:w-[80%]">
        <div className="flex flex-col md:flex-row gap-4 text-center md:text-left">
          {BottomFooter.map((element, index) => (
            <Link key={index} to={element.split(" ").join("-").toLowerCase()}>
              <p className="text-[#6E727F] hover:text-richblack-50 transition-all duration-200">
                {element}
              </p>
            </Link>
          ))}
        </div>
        <p className="text-[#6E727F] mt-4 md:mt-0">
          Made with ♥ © 2023 Studynotion
        </p>
      </div>
    </div>
  );
};

export default Footer;
