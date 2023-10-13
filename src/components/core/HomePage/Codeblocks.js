import React from 'react'
import CTAbutton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const Codeblocks = ({
    position,
    heading,
    subHeading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor
}) => {
  return (
    <div className={`flex ${position} gap-10 my-16 mb-20 justify-between `}>
      <div className='flex flex-col w-[40%] gap-6'>
        {heading}
        <div className='text-richblack-300 font-bold'>
            {subHeading}
        </div>
        <div className='flex flex-row mt-8 gap-8'>
            <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex flex-row items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight></FaArrowRight>
                </div>
            </CTAbutton>
            <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                
                    {ctabtn2.btnText}
                    
                
            </CTAbutton>

        </div>
       
      </div>

      <div className='w-[40%] flex flex-row bg-gradient-to-b from-[#0E1A2D3D] to-[#111E3261] relative gap-4'>

            <div className='text-center font-semibold text-richblack-400 w-[10%] font-inter flex flex-col'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
                <p>13</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation 
                    sequence={[codeblock,5000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style = {
                    {
                        whiteSpace: "pre-line",
                    }
            }
                />

            </div>
            <div className='w-[382.95px] h-[257.05px] opacity-[20%] blur-xl rotate-90 -top-15 -left-64 bg-gradient-to-b from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF] relative
            rounded-[50%]'></div>
      </div>
    </div>
  )
}

export default Codeblocks
