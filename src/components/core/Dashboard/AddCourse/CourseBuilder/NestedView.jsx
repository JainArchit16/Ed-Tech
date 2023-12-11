import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md"
import { MdDelete } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai"
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import {setCourse} from '../../../../../slices/courseSlice';
import { FaPlus } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import { IoIosArrowForward } from "react-icons/io";

const NestedView = ({handleChangeEditSectionName}) => {

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

    const[addSubSection,setAddSubSection]=useState(null);
    const[editSubSection,setEditSubSection]=useState(null);
    const[viewSubSection,setViewSubSection]=useState(null);

    const [confirmationModal,setConfirmationModal]=useState(null);

    const handleDeleteSection=async (sectionId)=>{
        let result=await deleteSection({
            courseId:course._id,
            sectionId:sectionId
        },token)
        if(result)
        {
            dispatch(setCourse(result));

        }
        setConfirmationModal(null);
    }
    
    const handleDeleteSubSection=async (subSectionId,sectionId)=>{
        const result=await deleteSubSection({
            subSectionId:subSectionId,
            courseId:course._id,
            sectionId:sectionId,
        },token)
        console.log("HEllo deleted");

        if(result){
            console.log(result);
            // const updatedCourseContent = course.courseContent.map((section)=> 
            // section._id===sectionId ? result : section)
            // const updatedCourse = {...course, courseContent: updatedCourseContent}
            const updatedCourse=result;
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null)
    }


    const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };

    return (

    <div className="rounded-lg bg-richblack-700 p-6 px-8">
            
    <div>

        {
            course.courseContent?.map((section)=>{

                return (
                <details key={section._id} open  onClick={()=>toggleSection(section._id)}>
                    
                    <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2">
                    <div className="flex items-center gap-x-3">
                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                        <p className="font-semibold text-richblack-50">
                        {section.sectionName}
                        </p>
                    </div>

                    <div className="flex items-center gap-x-3">
                    <button
                    onClick={() =>
                        handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                        )
                    }
                    >
                    <MdEdit className="text-xl text-richblack-300" />
                    </button>
                    <button
                    onClick={()=>{
                        setConfirmationModal({
                            text1:"Delete this section",
                            text2:"All the section will be deleted",
                            btn1Text:"Delete",
                            btn2Text:"Cancel",
                            btn1Handler:()=>handleDeleteSection(section._id),
                            btn2Handler:()=>setConfirmationModal(null),
                        })
                    }}>
                    <MdDelete className="text-xl text-richblack-300"/>
                    </button>
                    <span className="font-medium text-richblack-300">|</span>
                    <AiFillCaretDown
                    className={`text-xl text-richblack-300 transform ${
                      openSections[section._id] ? '' : 'rotate-90'
                    }`}
                   
                  />
                    </div>
                    </summary>

                    <div>
                    {section.subSection?.map((data) => (
                        <div
                        key={data?._id}
                        onClick={() => setViewSubSection(data)}
                        className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2 mx-6"
                        >
                        <div className="flex items-center gap-x-3 py-2 ">
                            <IoIosArrowForward className="text-2xl text-richblack-50" />
                            <p className="font-semibold text-richblack-50">
                            {data.title}
                            </p>
                        </div>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-x-3"
                        >
                            <button
                            onClick={() =>
                                setEditSubSection({ ...data, sectionId: section._id })
                            }
                            >
                            <MdEdit className="text-xl text-richblack-300" />
                            </button>
                            <button
                            onClick={() =>
                                setConfirmationModal({
                                text1: "Delete this Sub-Section?",
                                text2: "This lecture will be deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () =>handleDeleteSubSection(data._id, section._id),
                                btn2Handler: () => setConfirmationModal(null),
                                })
                            }
                            >
                            <RiDeleteBin6Line className="text-xl text-richblack-300" />
                            </button>
                        </div>
                        </div>
                    ))}
                    {/* Add New Lecture to Section */}
                    <button
                        onClick={() => setAddSubSection(section._id)}
                        className="my-3 flex items-center gap-x-1 mx-7 text-yellow-50"
                    >
                        <FaPlus className="text-lg" />
                        <p>Add Lecture</p>
                    </button>
                    </div>
                </details>
                )
            })
        }

    </div>

    {
            addSubSection ? (
                <SubSectionModal
                    modalData = {addSubSection}
                    setModalData = {setAddSubSection}
                    add= {true}
                />
            ): viewSubSection ? (
                <SubSectionModal
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                    view={true}
                />
            ): editSubSection ? (
                <SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true} />
            ): (<></>)
        }
        {/* Confirmation Modal */}
        {confirmationModal ? (
            <ConfirmationModal modalData={confirmationModal}/>
        ): (<></>)}
      
    </div>
  )
}

export default NestedView
