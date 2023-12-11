import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { setStep } from '../../../../slices/courseSlice';
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from "../AddCourse/CourseBuilder/CourseBuilderForm"
import Index from "../AddCourse/PublishCourse/index"

const RenderSteps = () => {
    const {step}=useSelector((state)=>state.course)
    // const dispatch=useDispatch();
    const steps=[
        {
            id:1,
            title:"Course Information",
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },
    ]


  return (
    <>

    
    <div className='flex flex-row w-full justify-between'>
        {steps.map((item)=>(
            <>

            
            <div key={item?.id} className='flex flex-col items-center gap-3'>
            <div  
            className={`${item.id===step || step>item.id?"bg-yellow-50 text-black":"bg-[#161D29] text-[#838894]"} 
            rounded-full p-2 h-[60px] w-[60px] 
            flex flex-col justify-center items-center text-xl`}
            // onClick={dispatch(setStep(item?.id))}
            >
                {
                    step>item.id?(<FaCheck/>):(item.id)
                }
            </div>
                <p className={`${item.id===step?"text-[#F1F2FF]":"text-[#585D69]"}`}>{item.title}</p>
            </div>
            
            </>
        ))}      
    </div>
    {
        step===1 && <CourseInformationForm/>

    }
    {
        step===2 && <CourseBuilderForm/>
    }
    {
        step===3 && <Index/>
    }
    </>
  )
}

export default RenderSteps
