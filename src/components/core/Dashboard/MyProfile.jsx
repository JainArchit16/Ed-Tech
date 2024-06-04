import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { AiFillEdit } from "react-icons/ai";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-6 gap-10 w-full md:max-w-[80%] mx-auto">
      <h1 className="text-white text-4xl font-inter">My Profile</h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center text-white bg-[#161D29] p-8 rounded-lg">
          <div className="flex flex-row gap-4 md:gap-8 items-center">
            <img
              src={`${user?.image}`}
              alt="xyz"
              className="aspect-square w-10 lg:w-[78px] rounded-full object-cover"
            />
            <div>
              <p className="text-lg">{user.firstName + " " + user.lastName}</p>
              <p className="text-[#838894] text-md">{user?.email}</p>
            </div>
          </div>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <AiFillEdit />
          </IconBtn>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-between items-center text-white bg-[#161D29] p-8 rounded-lg">
          <div className="flex flex-col gap-4 md:gap-10">
            <p className="text-lg">About</p>
            <p className="text-[#838894] text-md">
              {user.additionalDetails.about === null
                ? "Write Something About Yourself"
                : `${user.additionalDetails.about}`}
            </p>
          </div>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <AiFillEdit />
          </IconBtn>
        </div>

        <div className="flex flex-col gap-4 md:gap-8 text-white bg-[#161D29] p-8 rounded-lg">
          <div className="flex flex-row justify-between items-center">
            <p className="text-lg">Profile Details</p>
            <IconBtn
              text="Edit"
              onClick={() => {
                navigate("/dashboard/settings");
              }}
            >
              <AiFillEdit />
            </IconBtn>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
            <div className="flex flex-col gap-4 md:gap-8 w-full lg:w-1/2">
              <div>
                <p>First Name</p>
                <p className="text-[#838894]">{user?.firstName}</p>
              </div>
              <div>
                <p>Email</p>
                <p className="text-[#838894]">{user?.email}</p>
              </div>
              <div>
                <p>Gender</p>
                <p className="text-[#838894]">
                  {user?.additionalDetails.gender
                    ? `${user?.additionalDetails.gender}`
                    : "Add Gender"}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 w-full lg:w-1/2">
              <div>
                <p>Last Name</p>
                <p className="text-[#838894]">{user?.lastName}</p>
              </div>
              <div>
                <p>Date Of Birth</p>
                <p className="text-[#838894]">
                  {user?.additionalDetails.dateOfBirth
                    ? `${user?.additionalDetails.dateOfBirth}`
                    : "Add Date of Birth"}
                </p>
              </div>
              <div>
                <p>Contact Number</p>
                <p className="text-[#838894]">
                  {user?.additionalDetails.contactNumber
                    ? `${user?.additionalDetails.contactNumber}`
                    : "Add Contact Number"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
