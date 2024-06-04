import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { BiCloudUpload } from "react-icons/bi";
import {
  deleteProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../../services/operations/SettingsAPI";
import { useForm } from "react-hook-form";
import { setToken } from "../../../slices/authSlice";
import { FiTrash2 } from "react-icons/fi";

const Setting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [imageFile, setImageFile] = useState(null);
  const { register, handleSubmit } = useForm();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleFileUpload = () => {
    try {
      const formData = new FormData();
      formData.append("pfp", imageFile);
      dispatch(uploadProfilePicture(user, token, formData));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const handleProfileSubmit = async (data) => {
    try {
      dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  const handleDeleteAccount = () => {
    dispatch(deleteProfile(user, token, navigate));
  };

  return (
    <div className="flex flex-col p-6 gap-10 w-full md:w-[80%] mx-auto min-h-screen">
      <h1 className="text-white text-2xl md:text-4xl font-inter">
        Edit Profile
      </h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-white bg-[#161D29] p-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <img
              src={`${user?.image}`}
              alt="Profile"
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="text-center md:text-left">
              <p className="text-lg my-1">Change Profile Picture</p>
              <div className="flex flex-col md:flex-row gap-4 mt-2">
                <button
                  className="py-2 bg-richblack-700 text-[#C5C7D4] rounded-lg px-4 font-semibold"
                  onClick={handleClick}
                >
                  Select
                </button>
                <button
                  className="flex flex-row gap-2 items-center text-black bg-yellow-50 rounded-lg px-4 py-2 font-semibold"
                  onClick={handleFileUpload}
                >
                  <p>Upload</p>
                  <BiCloudUpload className="text-lg" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleProfileSubmit)}>
          <div className="flex flex-col gap-4 justify-between text-white bg-[#161D29] p-8 rounded-lg">
            <div className="flex flex-row gap-8 items-center justify-between">
              <div>
                <p className="text-lg my-1 font-semibold font-inter">
                  Profile Information
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mt-4 w-full md:w-[70%] gap-4">
              <div className="flex flex-col gap-8 w-full md:w-auto">
                <label htmlFor="firstName">
                  <p className="text-[#F1F2FF]">First Name</p>
                  <input
                    required
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    defaultValue={user.firstName}
                    {...register("firstName", { required: true })}
                    className="bg-[#2C333F] p-2 rounded-md mt-3 focus:outline-none w-full"
                  />
                </label>

                <label htmlFor="dateOfBirth">
                  <p className="text-[#F1F2FF]">Date of Birth</p>
                  <input
                    required
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    placeholder="Enter DOB"
                    defaultValue={user?.additionalDetails?.dateOfBirth}
                    {...register("dateOfBirth", {
                      required: {
                        value: true,
                        message: "Please enter your Date of Birth.",
                      },
                    })}
                    className="bg-[#2C333F] p-2 rounded-md mt-3 focus:outline-none w-full"
                  />
                </label>

                <label htmlFor="contact">
                  <p className="text-[#F1F2FF]">Contact Number</p>
                  <input
                    required
                    type="number"
                    name="contact"
                    id="contact"
                    placeholder="Enter Contact Number"
                    defaultValue={user?.additionalDetails?.contactNumber}
                    {...register("contactNumber", {
                      required: {
                        value: true,
                        message: "Please enter your Contact Number.",
                      },
                      maxLength: {
                        value: 12,
                        message: "Invalid Contact Number",
                      },
                      minLength: {
                        value: 10,
                        message: "Invalid Contact Number.",
                      },
                    })}
                    className="bg-[#2C333F] p-2 rounded-md mt-3 focus:outline-none w-full"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-8 w-full md:w-auto">
                <label htmlFor="lastname">
                  <p className="text-[#F1F2FF]">Last Name</p>
                  <input
                    required
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="Enter Last Name"
                    defaultValue={user?.lastName}
                    {...register("lastName", { required: true })}
                    className="bg-[#2C333F] p-2 rounded-md mt-3 focus:outline-none w-full"
                  />
                </label>

                <label htmlFor="gender">
                  <p className="text-[#F1F2FF]">Gender</p>
                  <input
                    required
                    type="text"
                    name="gender"
                    id="gender"
                    placeholder="Enter Gender"
                    defaultValue={user?.additionalDetails?.gender}
                    {...register("gender", { required: true })}
                    className="bg-[#2C333F] p-2 rounded-md mt-3 focus:outline-none w-full"
                  />
                </label>

                <label htmlFor="about">
                  <p className="text-[#F1F2FF]">About</p>
                  <input
                    required
                    type="text"
                    name="about"
                    id="about"
                    placeholder="Enter Bio"
                    defaultValue={user?.additionalDetails?.about}
                    {...register("about", { required: true })}
                    className="bg-[#2C333F] p-2 rounded-md mt-3 focus:outline-none w-full"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-4 mt-6">
            <button
              className="py-2 bg-richblack-700 text-[#C5C7D4] rounded-lg px-4 font-semibold"
              onClick={() => {
                navigate("/dashboard/my-profile");
              }}
            >
              Cancel
            </button>
            <button
              className="flex flex-row gap-2 items-center text-black bg-yellow-50 rounded-lg px-4 py-2 font-semibold"
              type="submit"
            >
              <p>Save</p>
            </button>
          </div>
        </form>

        <div className="mt-10 mb-2 flex flex-col md:flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
          <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
            <FiTrash2 className="text-3xl text-pink-200" />
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold text-richblack-5">
              Delete Account
            </h2>
            <div className="text-pink-25">
              <p>Would you like to delete account?</p>
              <p>
                This account may contain Paid Courses. Deleting your account is
                permanent and will remove all the contain associated with it.
              </p>
            </div>
            <button
              type="button"
              className="w-fit cursor-pointer italic text-pink-300"
              onClick={handleDeleteAccount}
            >
              I want to delete my account.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
