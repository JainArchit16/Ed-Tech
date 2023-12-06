import React from 'react'
// import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from "../../../services/operations/authAPI"


const ProfileDropDown = () => {
  const {user} =useSelector((state)=>state.profile);
  // const {token} =useSelector((state)=>state.auth);
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the dropdown state
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to close the dropdown when a click is detected outside of it
  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.profile-dropdown')) {
      setIsOpen(false);
    }
  };

  // Effect to add click event listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]); // Re-run the effect when isOpen changes
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ref = useRef(null)


  return (
    <button className='relative profile-dropdown'>
     <img 
            src={`${user?.image}`}
            alt="xyz"
            className='aspect-square w-[40px] rounded-full object-cover'
            onClick={()=>setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setIsOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate))
              setIsOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}

    </button>
  )
}

export default ProfileDropDown
