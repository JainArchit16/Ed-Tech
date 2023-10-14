import React from 'react';

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import TimelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
  {
    Logo: Logo1,
    heading: 'Leadership',
    subHeading: 'Fully committed to the success company',
  },
  {
    Logo: Logo2,
    heading: 'Responsibility',
    subHeading: 'Students will always be our top priority',
  },
  {
    Logo: Logo3,
    heading: 'Flexibility',
    subHeading: 'The ability to switch is an important skill',
  },
  {
    Logo: Logo4,
    heading: 'Solve the problem',
    subHeading: 'Code your way to a solution',
  },
];

const TimelineSection = () => {
  return (
    <div className='w-11/12 flex flex-row gap-28 justify-center mx-auto p-12 my-2'>
      <div className='flex flex-col gap-20'>
        {timeline.map((element, index) => {
          return (
            <div className='flex flex-row gap-6 items-center' key={index}>
              <div className='relative'>
                <img src={element.Logo} className='z-50 relative' alt={element.heading} />
                <div className='bg-white rounded-[100%] w-[50px] h-[50px] absolute -top-4 -left-[16px] shadow-lg'></div>
              </div>
              <div className='flex flex-col'>
                <p className='font-bold text-lg'>{element.heading}</p>
                <p>{element.subHeading}</p>
              </div>
              {index < timeline.length - 1 && (
                <div className='w-[0.1px] h-[80px] border-dotted border-l-2 border-[#AFB2BF] relative top-20 -left-[340px]'></div>
              )}
            </div>
          );
        })}

      </div>



      <div className='relative shadow-blue-200'>
        <img src={TimelineImage} alt='Timeline' className='rounded-md object-cover z-20 relative'/>
        <div className='w-[749.26px] h-[479.64px] opacity-[60%] blur-3xl top-6 bg-gradient-to-b from-[#9CECFB] via-[#65C7F7] to-[#0052D4] absolute
            rounded-[50%] z-10'></div>
            <div className='bg-[#014A32] w-[480px] h-[108px] justify-between px-6 mx-auto -bottom-10 right-24 absolute z-30 flex flex-row gap-14 items-center'>
              <div className='flex flex-row items-center gap-4'>
                  <p className='text-[#FFFFFF] text-3xl font-bold'>10</p>
                  <p className='text-[#05A77B]'>YEARS <br/>EXPERIENCES</p>
              </div>
              <div className='bg-[#037957] w-[1px] h-[45px] z-40'>
              </div>
              <div className='flex flex-row items-center gap-4'>
              <p className='text-[#FFFFFF] text-3xl font-bold'>250</p>
                  <p className='text-[#05A77B]'>TYPES OF <br/>COURSES</p>
              </div>
            </div>
      </div>  
    </div>
  );
};

export default TimelineSection;
