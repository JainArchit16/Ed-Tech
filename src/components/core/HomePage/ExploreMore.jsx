import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore";
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const ExploreMore = () => {
    let [tag,setTag]=useState("free");
    const [data,setData]=useState(HomePageExplore[0].courses)
    let [currentCard,setCard]=useState(data[0].heading);

    function handleClick(event) {
      const newTag = event.target.value.toLowerCase();
      setTag(newTag);
      const newData = HomePageExplore.find(element => element.tag.toLowerCase() === newTag);
      setData(newData ? newData.courses : []);
      // setCard(data[0].heading);
  }
  
  return (
    <div className='flex flex-col w-[90%] justify-between gap-4 items-center absolute'>
    <p className='text-white text-4xl'>Unlock the <HighlightText text={"Power of Code"}></HighlightText></p>
    <p className='text-[#838894] text-xl'>Learn to Build Anything You Can Imagine</p>
      <div className='flex flex-row mt-10 bg-richblack-800 rounded-full p-1 gap-6'>
      {
        HomePageExplore.map((element,index)=>{
            return (
                <div className={`p-2 rounded-full
                ${tag===element.tag.toLowerCase()?"bg-richblack-900 text-white":"transparent text-[#838894]"}
                 hover:bg-richblack-900 hover:text-white transition-all duration-200`}>

                <button key={index} onClick={handleClick} value={element.tag}>
                    {element.tag}
                </button>
                </div>
            )
        })
      }
            
      </div>

      <div className='flex flex-row gap-4 justify-between items-center relative'>
      {

        data.map((element,index)=>{
          return (
            <CourseCard
            setCard={setCard}
            currentCard={currentCard}
            data={element}
            key={index}
            />
          )
        })
      }
      </div>
    </div>
  )
}

export default ExploreMore
