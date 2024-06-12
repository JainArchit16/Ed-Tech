import React from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../slices/cartSlice";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { FaRegShareSquare } from "react-icons/fa";
import { ACCOUNT_TYPE } from "../../../utils/constants";

const CourseDetailsCard = ({
  course,
  handleBuyCourse,
  setConfirmationModal,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied To Clipboard");
  };

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructor Cannot Buy The Course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in",
      text2: "Please Login to add to cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  let courseInstructions = null;
  try {
    courseInstructions = JSON.parse(course?.instructions);
  } catch (error) {
    courseInstructions = course?.instructions;
  }

  return (
    <div className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 max-w-full md:max-w-md mx-auto">
      <img
        alt="thumbnail"
        src={course.thumbnail}
        className="max-h-[300px] min-h-[180px] w-full rounded-2xl object-cover"
      />
      <p className="text-xl font-semibold">₹ {course.price}</p>
      <button
        className="yellowButton w-full"
        onClick={
          user && course?.studentsEnrolled.includes(user?._id)
            ? () => navigate("/dashboard/enrolled-courses")
            : handleBuyCourse
        }
      >
        {user && course?.studentsEnrolled.includes(user?._id)
          ? "Go to Course"
          : "Buy Now"}
      </button>
      {!course?.studentsEnrolled.includes(user?._id) && (
        <button onClick={handleAddToCart} className="blackButton w-full">
          Add to Cart
        </button>
      )}
      <div>
        <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
          30-Day Money-Back Guarantee
        </p>
      </div>
      <div>
        <p className="my-2 text-xl font-semibold">This Course Includes:</p>
        <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
          {courseInstructions.map((item, index) => (
            <p key={index} className="flex gap-2 items-center">
              <BiSolidRightArrow />
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="text-center">
        <button
          className="text-yellow-100 flex flex-row gap-2 items-center justify-center text-lg w-full"
          onClick={handleShare}
        >
          <FaRegShareSquare />
          Share
        </button>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
