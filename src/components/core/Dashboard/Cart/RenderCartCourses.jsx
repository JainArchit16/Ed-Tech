import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineStar,AiTwotoneStar} from "react-icons/ai"
import ReactStars from "react-rating-stars-component"
import {BsFillTrashFill} from "react-icons/bs"
import {removeFromCart} from "../../../../slices/cartSlice"

const RenderCartCourses = () => {
  const {cart}=useSelector((state)=>state.cart);
  const dispatch=useDispatch();
  return (
    <div>
      {
        cart.map((course,index)=>{
          <div>
            <div>
              <img src={course.thumbnail}/>
              <div>
                <p>
                  {course?.courseName}
                </p>
                <p>
                  {course?.category?.name}
                </p>
                <span>
                  4.8
                </span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  activeColor='#ffd700'
                  emptyIcon={<AiOutlineStar/>}
                  fullIcon={<AiTwotoneStar/>}
                />
                <span>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
            </div>
            <div>
              <button onClick={()=>dispatch(removeFromCart(course._id))}>
                <BsFillTrashFill/>
                <span>Remove</span>
              </button>
              <p>{course?.price}</p>
            </div>
          </div>
        })
      }
    </div>
  )
}

export default RenderCartCourses
