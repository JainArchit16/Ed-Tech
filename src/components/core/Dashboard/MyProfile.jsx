import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import {AiFillEdit} from "react-icons/ai"

const MyProfile = () => {
    const {user} =useSelector((state)=>state.profile);

    const {token} =useSelector((state)=>state.auth);
    console.log("Profile",token);
    const navigate=useNavigate();


  return (
    <div className='flex flex-col p-6 gap-10 w-[80%] mx-auto'>
      <h1 className='text-white text-4xl font-inter'>
        My Profile
      </h1>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row gap-4 justify-between items-center text-white bg-[#161D29] p-8 rounded-lg'>
            <div className='flex flex-row gap-8 items-center justify-between'>
            <img 
            src={`${user?.image}`}
            alt="xyz"
            className='aspect-square w-[78px] rounded-full object-cover'
            />
            <div>
                <p className='text-lg'>{user.firstName+" "+user.lastName}</p>
                <p className='text-[#838894] text-md'>{user?.email}</p>
            </div>
            </div>
            <IconBtn
            text="Edit"
            onClick={()=>{
                navigate("/dashboard/settings")
            }}
        >
        <AiFillEdit/>
        </IconBtn>
        </div>


        <div className='flex flex-row gap-4 justify-between items-center text-white bg-[#161D29] p-8 rounded-lg'>
            <div className='flex flex-col gap-10  justify-between'>
                <p className='text-lg'>About</p>
                <p className='text-[#838894] text-md'>{
                    user.additionalDetails.about===null?("Write Something About Yourself"):(`${user.additionalDetails.about}`)
                }</p>
            </div>
            <IconBtn
            text="Edit"
            onClick={()=>{
                navigate("/dashboard/settings")
            }}
        >
        <AiFillEdit/>
        </IconBtn>
        </div>


        <div className='flex flex-row gap-4 justify-between items-center text-white bg-[#161D29] p-8 rounded-lg w-full'>
            <div className='flex flex-col gap-10  justify-between w-full'>

            <div className='flex flex-row w-full justify-between items-center'>
                <p className='text-lg'>Profile Details</p>

                <IconBtn
                text="Edit"
                onClick={()=>{
                    navigate("/dashboard/settings")
                }}
        >
        <AiFillEdit/>
        </IconBtn>

            </div>
                


                <div className='flex flex-row gap-40 w-[80%]'>
                    <div className='flex flex-col gap-8 w-[55%]'>
                            <div>
                                <p>First Name</p>
                                <p className='text-[#838894]'>{user?.firstName}</p>

                            </div>

                            <div>
                                <p>Email</p>
                                <p className='text-[#838894]'>{user?.email}</p>

                            </div>

                            <div>
                                <p>Gender</p>
                                <p className='text-[#838894]'>{user?.additionalDetails.gender?`${user?.additionalDetails.gender}`:"Add Gender"}</p>

                            </div>

                            

                    </div>
                        
                <div className='flex flex-col justify-between w-[55%]'>
                        <div>
                            <p>Last Name</p>
                            <p className='text-[#838894]'>{user?.lastName}</p>

                        </div>
                        <div>
                            <p>Date Of Birth</p>
                            <p className='text-[#838894]'>{user?.additionalDetails.dateOfBirth?`${user?.additionalDetails.dateOfBirth}`:"Add Date of Birth"}</p>

                        </div>
                        <div>
                            <p>Contact Number</p>
                            <p className='text-[#838894]'>{user?.additionalDetails.contactNumber?`${user?.additionalDetails.contactNumber}`:"Add Contact Number"}</p>

                        </div>


                </div>
                        

                </div>



            </div>
            
        </div>

            



        
      </div>
    </div>
  )
}

export default MyProfile
