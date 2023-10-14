import React from 'react'
import HighlightText from './HighlightText'
import Button from "./Button"
import image1 from "../../../assets/Images/Compare_with_others.png"
import image2 from "../../../assets/Images/Plan_your_lessons.png"
import image3 from "../../../assets/Images/Know_your_progress.png"

const LearningLanguageSection = () => {
  return (
    <div className='w-11/12 flex flex-col gap-10 justify-between mx-auto p-12 my-2 font-inter items-center'>
      <div className='w-[60%] text-3xl font-inter font-bold text-black text-center'>  
      Your swiss knife for <HighlightText text={" learning any language"}/>
      </div>
      <div className='w-[60%] text-lg font-inter text-center'>
      Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>
      <div className='flex flex-row w-[80%] relative items-center justify-between'>
        <img src={image3} className='shadow-black object-contain'/>
        <img src={image1} className='shadow-black object-contain -ml-32 -mr-32'/>
        <img src={image2} className='shadow-black object-contain'/>
      </div>
      <div>
        <Button active={true} linkto={"/signup"}>
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default LearningLanguageSection
