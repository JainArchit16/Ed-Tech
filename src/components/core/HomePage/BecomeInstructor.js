import React from 'react'
import instructor from '../../../assets/Images/Instructor.png';
import Button from './Button';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from './HighlightText';

const BecomeInstructor = () => {
  return (
    <div className='flex flex-row gap-20 justify-between items-center w-[80%] my-28 mx-auto'>
    <div className='w-[47%] relative'>
      <img src={instructor} className='w-[90%] z-30 relative'/>
        <div className='bg-white w-[88%] h-[88%] absolute -top-3 -left-3'></div>
    </div>
    <div className='flex flex-col gap-10 justify-between w-[40%]'>
        <p className='text-white text-4xl'>Become an <HighlightText text={"instructor"}></HighlightText></p>
        <p className='text-[#838894] text-lg'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
        <Button active={true} linkto={"/signup"}><div className='flex flex-row items-center gap-2'>Start Teaching Today<FaArrowRight/>
        </div></Button>
    </div>
      <div>

      </div>
    </div>
  )
}

export default BecomeInstructor
