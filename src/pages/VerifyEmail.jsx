import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { signUp, sendOtp } from "../services/operations/authAPI";
import Loader from "../components/common/Loader";

const VerifyEmail = () => {
  const { Loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleResend = (e) => {
    e.preventDefault();
    dispatch(sendOtp(signupData.email, navigate));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen text-white bg-gray-900 p-4 sm:p-8">
      {Loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-between w-full max-w-lg text-white gap-4">
          <h1 className="text-3xl font-semibold font-inter">Verify Email</h1>
          <p className="text-richblack-400 text-lg">
            A verification mail has been sent to you. Enter the code below.
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <OTPInput
              value={otp}
              onChange={setotp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              inputStyle="h-10 sm:w-12 sm:h-12 md:w-24 rounded-md border border-richblack-500 text-2xl text-center bg-[#161D29] focus:outline-none"
              focusStyle="border-2 border-red-500"
              isInputNum
              shouldAutoFocus
              containerStyle="flex justify-between gap-2 sm:gap-4"
              renderInput={(props) => <input {...props} />}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 text-black font-inter text-xl p-2 rounded-md mt-12 hover:bg-yellow-100 transition duration-300"
            >
              Verify Email
            </button>
          </form>
          <Link to="/login" className="flex items-center gap-2 mt-4">
            <AiOutlineArrowLeft />
            <p>Back to Login</p>
          </Link>
          <button
            onClick={handleResend}
            className="mt-4 text-sm text-blue-500 hover:underline"
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
