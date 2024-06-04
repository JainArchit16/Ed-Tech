import React, { useState } from "react";
import Loader from "../components/common/Loader";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const { Loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleOnSubmit = (event) => {
    // console.log("clicked");
    event.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen lg:min-h-[91.7vh] text-white w-full mx-auto ">
      {Loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col justify-between w-[80%] lg:w-[30%] gap-4">
          {emailSent ? (
            <div className="text-3xl font-semibold font-inter">
              Check Your Email
            </div>
          ) : (
            <div className="text-3xl font-semibold font-inter">
              Reset Your Password
            </div>
          )}
          {emailSent ? (
            <div className="text-richblack-400 text-lg">
              {`We have sent the reset email to ${email}`}
            </div>
          ) : (
            <div className="text-richblack-400 text-lg">
              Have no fear. We'll email you instructions to reset your password.
              If you dont have access to your email we can try account recovery
            </div>
          )}
          <form onSubmit={handleOnSubmit}>
            {!emailSent ? (
              <label for="email">
                <p className="text-richblack-400 py-2">Email Address</p>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="bg-richblack-600 p-2 rounded-lg w-[100%] mb-2 focus:outline-none"
                />
              </label>
            ) : (
              <div></div>
            )}

            <button
              type="submit"
              className="bg-yellow-50 text-black font inter font-xl p-2 rounded-md my-2"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <Link to="/login">
            <div className="flex flex-row items-center gap-2">
              <AiOutlineArrowLeft></AiOutlineArrowLeft>
              <p>Back to Login</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
