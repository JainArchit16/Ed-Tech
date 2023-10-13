import React from 'react'

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";
const timeline=[
    {
        Logo:Logo1,
        heading:"LeaderShip",
        subHeading:"Fully committed to the success company"
    },
    {
        Logo:Logo2,
        heading:"Responsiblity",
        subHeading:"Students will always be our top priority"
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        subHeading:"The ability to switch is an important skills"
    },
    {
        Logo:Logo4,
        heading:"Solve the problem",
        subHeading:"Code your way to a solution"
    },
]

const TimelineSection = () => {
  return (
    <div className='w-11/12 flex flex-row gap-28 justify-center mx-auto p-12 my-2'>

    <div className='flex flex-col gap-24'>

    {

        timeline.map((element)=>{
            return (
                <div className='flex flex-row gap-6 items-center'>
                    <div className='relative'>
                    <img src={element.Logo} className='z-50 relative'></img>
                    <div className='bg-white rounded-[100%] w-[50px] h-[50px] absolute -top-4 -left-[16px] shadow-lg'></div>
                    </div>
                    <div className='flex flex-col'>

                        <p className='font-bold text-lg'>{element.heading}</p>
                        <p>{element.subHeading}</p>

                    </div>
                </div>
            )
        })
    }


    </div>
    
    
    <div>
        <img src={TimelineImage}/>
    </div>
      
    </div>
  )
}

export default TimelineSection
