import React from "react";
import { useSelector } from "react-redux";
import RenderTotalAmount from "./RenderTotalAmount";
import RenderCartCourses from "./RenderCartCourses";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="p-4 md:p-8 text-white flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl">Your Cart</h1>
      <p className="text-[#6E727F]">{totalItems} Courses in Cart</p>
      <hr className="text-[#2C333F] w-full md:w-[90%]" />
      {total > 0 ? (
        <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-10">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p>Your Cart is Empty</p>
      )}
    </div>
  );
};

export default Cart;
