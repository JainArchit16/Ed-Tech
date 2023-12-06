import React from 'react'
import RenderSteps from './RenderSteps'
import {BsFillLightningChargeFill} from "react-icons/bs"
const AddCourse = () => {
  return (
    <div className=' py-6 px-8 w-full'>


<div className='text-white flex flex-row justify-between items-baseline gap-2 w-full'>
        <div className='flex flex-col gap-8 w-[60%]'>
            <h1 className='text-2xl'>
                Add Course
            </h1>
            <div className='w-full'>
                <RenderSteps/>
            </div>
        </div>
        <div className='bg-[#161D29] text-[#F1F2FF] w-[32%] p-6 rounded-lg'>
            <div className='flex flex-row gap-2 items-center'>
            <BsFillLightningChargeFill className='text-yellow-50'/>
            <p className='py-4'>
                Code Upload Tips
            </p>
            </div>
            <ul className="list-disc gap-2 flex flex-col">
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>

            </ul>
        </div>
    </div>


    </div>
    
  )
}

export default AddCourse 
