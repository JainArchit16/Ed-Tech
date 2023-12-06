import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from "../../../common/IconBtn"



const handleBuyCourse=(cart)=>{
  console.log("I am buying Courses")
  const courses=cart.map((course)=>course._id);
  console.log(courses)
}
const RenderTotalAmount = () => {
  const {total} =useSelector((state)=>state.cart);
  const {cart} =useSelector((state)=>state.cart);
  return (
    <div className='flex flex-col bg-[#161D29] text-[#2C333F] gap-3'>
      <p>Total:</p>
      <p className='text-lg text-[#FFD60A]'>Rs. {total}</p>
      <IconBtn
      text="Buy Now"
      onClick={handleBuyCourse(cart)}
      customClasses={"w-full justify-center"}></IconBtn>
    </div>

  )
}

export default RenderTotalAmount
