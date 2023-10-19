import React from 'react';
import {HiUsers} from 'react-icons/hi'
import {ImTree} from 'react-icons/im'


const CourseCard = (props) => {
  const currentCard=props.currentCard;
  const setCard=props.setCard;

  function onClickHandle()
  {
    const newCard=props.data.heading;
    setCard(newCard);
  }
  return (
    <div className={`flex flex-col  p-6 w-[30%] h-[300px] mt-10 relative justify-between
    ${currentCard===props.data.heading?"bg-white shadow-[12px_12px_0_0] shadow-yellow-50":"bg-richblack-800"}`}
    onClick={onClickHandle}>
      <div>

      <div className={`${currentCard===props.data.heading?"text-black":"text-[#DBDDEA]"} font-semibold text-xl mb-4`}>{props.data.heading}</div>
      <div className='text-[#6E727F] text-md'>{props.data.description}</div>
      </div>

      {/* <div className='absolute bottom-12 border-[#6E727F] border-t-2 border-dashed w-[90%]'></div> */}
      <div className={`flex flex-row justify-between bottom-0 border-[#6E727F] border-t-2 border-dashed pt-4 
      ${currentCard===props.data.heading?"text-blue-300":"text-[#6E727F]"}`}>
      <div className='flex items-center gap-2 text-[16px]'>
          <HiUsers />
          <p>{props.data.level}</p>
        </div>

        {/* Flow Chart */}
        <div className='flex items-center gap-2 text-[16px]'>
          <ImTree />
          <p>{props.data.lessionNumber} Lessons </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
