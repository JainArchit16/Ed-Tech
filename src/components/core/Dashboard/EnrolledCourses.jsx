import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import Loader from "../../common/Loader";
import ProgressBar from '@ramonak/react-progress-bar';


//Complete krlo isko baad mein

const EnrolledCourses = () => {
    const {user}=useSelector((state)=>state.profile);
    const {token} =useSelector((state)=>state.auth);


    const dispatch=useDispatch();
    const [enrolledCourses,setEnrolledCourses]=useState(null);

    const getEnrolledCourse=async()=>{
        try{
            const response=await getEnrolledCourses(user,token);
            setEnrolledCourses(response);
            console.log(enrolledCourses);
        }
        catch(error)
        {
            console.log(error.message());
        }
    }

    useEffect(()=>{
        getEnrolledCourse()
    },[])

  return (
    <div className='p-10'>

              <div className='flex flex-col gap-4 text-white'>
                    <h1 className='text-2xl text-white font-inter'>
                        Enrolled Courses
                    </h1>

                    {
                        !enrolledCourses?(
                            <Loader/>
                        ):!enrolledCourses.length?(
                            <p>You Have Not Enrolled In any Course</p>
                        ):(
                            <div className='w-[90%]'>
                                <div className='flex flex-row bg-[#2C333F] text-[#C5C7D4] justify-between p-4 rounded-md w-[100%]'>
                                    <p className='w-[40%]'>Course Name</p>
                                    <p className='w-[30%]'>Duration</p>
                                    <p className='w-[20%]'>Progress</p>
                                    <div className='w-[20%]'>
                                        
                                    </div>
                                </div>
                                {
                                    enrolledCourses.map((elem,index)=>(
                                        <div className='flex flex-row justify-between px-6 items-center w-[100%] border-[1px] border-[#2C333F] py-4 border-t-0'>
                                            <div className='flex flex-row gap-6 items-center w-[40%]'>
                                                <img src={elem.thumbnail} className='rounded-md w-[52px] h-[52px]'/>
                                            <div>
                                                <div className='text-lg'>
                                                    {elem.courseName}
                                                </div>
                                                <div className='text-md text-[#838894] w-[80%]'>
                                                    {elem.courseDescription}
                                                </div>
                                            </div>
                                            </div>
                                            <div className='w-[30%]'>
                                                {elem?.courseDuration}
                                            </div>
                                            <div className='flex flex-col gap-3 w-[20%]'>
                                                <div>
                                                    Progress: {elem.progressPercentage || 0}
                                                </div>
                                                <ProgressBar 
                                                    completed={elem.progressPercentage || 0}
                                                    height= '8px'
                                                    isLabelVisible={false}
                                                />
                                            </div>

                                            <div className='w-[20%]'></div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
              </div>
    </div>
  )
}

export default EnrolledCourses
