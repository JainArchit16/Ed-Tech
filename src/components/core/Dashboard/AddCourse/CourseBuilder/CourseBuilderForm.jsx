import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import IconBtn from "../../../../common/IconBtn"
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { FaArrowAltCircleRight } from "react-icons/fa";
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';




const CourseBuilderForm = () => {

  const {register,setValue,getValues,handleSubmit,formState:{errors}}=useForm();
  const [editSectionName,setEditSectionName]=useState(false);
  const {course}=useSelector((state)=>state.course);
  const {token} =useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  function goToBack()
  {
    
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }

  function goToNext()
  {
    if(course.courseContent.length==0)
    {
      toast.error("Please Enter atleast 1 section");
      return;
    }
    if(course.courseContent.some((section)=>section.subSection.length===0))
    {
      toast.error("Please Enter atleast 1 subSection");
      return;
    }
    dispatch(setStep(3));
    // dispatch(setEditCourse(true));
  }
  const [loading,setLoading]=useState(false);
  const onSubmit=async (data)=>{
    setLoading(true);
    let result;
    if(editSectionName)
    {
      result=await updateSection({
        sectionName:data.sectionName,
        sectionId:editSectionName,
        courseId:course._id,
      },token)
    }
    else{
      result=await createSection({
        sectionName:data.sectionName,
        courseId:course._id,
      },token)
    }
    if(result)
    {
      dispatch(setCourse(result));
      setEditCourse(null);
      setValue("sectionName","");

    }

    setLoading(false);
  }

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","");
  }
  const handleChangeEditSectionName=(sectionId,sectionName)=>{

    if(editSectionName==sectionId)
    {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName);
  }

  return (
    <div className='bg-[#161D29] p-4 rounded-md my-12'>
      <div className='flex flex-col gap-4'>
          <h1 className='text-xl'>Course Builder</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label for="sectionName">
                Section Name<sup className='text-[red] text-xl'> *</sup>
              </label>
              <input
                id="sectionName"
                placeholder='Add Section Name'
                {...register("sectionName",{required:true})}
                className='w-full my-3 px-3 py-3 bg-[#2C333F] focus:outline-none rounded-md'
              />
              {
                errors.sectionName && (
                  <span>
                    Section Name is required
                  </span>
                )
              }

            </div>
            <div>
              <IconBtn
                type="Submit"
                text={editSectionName?"Edit Section Name":"Create Section"}
                outline={true}
              />
              {
                editSectionName &&(
                <button onClick={()=>{
                  setEditSectionName(false);
                  setValue("sectionName","");
                }} className='mx-4 text-[#838894]'>
                  Cancel Edit
                </button>
                )
              }
            </div>
          </form>
          {
            course.courseContent.length>0
            &&(<NestedView handleChangeEditSectionName={handleChangeEditSectionName}></NestedView>)
          }

          <div className='w-full text-right my-2'>


          <button onClick={goToBack}
                 className='mx-4 text-[#838894]'>
                  Back
                </button>



              <IconBtn
                type="Submit"
                text="Next"
                onClick={goToNext}
                outline={true}
                reverse={true}
              >
              <FaArrowAltCircleRight/>
              </IconBtn>
                
                
                
              
            </div>
      </div>
    </div>
  )
}

export default CourseBuilderForm
