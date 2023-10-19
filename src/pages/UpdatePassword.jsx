import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/common/Loader';
import { useLocation } from 'react-router-dom';
import {AiOutlineEye} from 'react-icons/ai';
import {BsEyeSlash} from "react-icons/bs"
import { Link } from 'react-router-dom';
import {AiOutlineArrowLeft} from "react-icons/ai"
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const {Loading,setLoading} = useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [showPassword,setShowPass]=useState(false);
    const [showConfirmPassword,setShowConfirmPass]=useState(false);
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:"",
    })
    const {password,confirmPassword}=formData;
    const location=useLocation();


const handleChange=(e)=>{
    setFormData((prevData)=>({
        ...prevData,
        [e.target.name]:e.target.value,
    }))
} 

const handleOnSubmit=(e)=>{
    e.preventDefault();
    const token=location.pathname.split("/").at(-1);
    dispatch(resetPassword(password,confirmPassword,token))
}
  return (
    <div className='flex flex-col justify-center items-center w-screen h-[91vh] text-white'>
        {
            Loading?(
                <Loader></Loader>
            ):(
                <div className='flex flex-col justify-between w-[30%] text-white gap-4'>
                <h1 className='text-3xl font-semibold font-inter'>
                   Choose New Password
                </h1>
                <p className='text-richblack-400 text-lg'>
                    Almost done Enter your new passowrd and you're All set.
                </p>
                <form onSubmit={handleOnSubmit}>
                    <label for='newPass' className='relative'>
                    <p>New Password*</p>
                        <input
                        required
                        type={showPassword?"text":"password"}
                        value={password}
                        onChange={handleChange}
                        name='password'
                        className='bg-richblack-600 p-2 rounded-lg w-[100%] mb-2 focus:outline-none'
                        >
                        </input>
                        <span onClick={()=>setShowPass((prev)=>!prev)} className='absolute text-xl top-8 right-4'>
                            {
                                showPassword?<BsEyeSlash/>:<AiOutlineEye/>
                            }

                        </span>
                    </label>
                    <label for='ConfirmPass' className='relative'>
                    <p>Confirm New Password*</p>
                        <input
                         required
                        type={showConfirmPassword?"text":"password"}
                        value={confirmPassword}
                        onChange={handleChange}
                        name='confirmPassword'
                        className='bg-richblack-600 p-2 rounded-lg w-[100%] mb-2 focus:outline-none'
                        >
                        </input>
                        <span onClick={()=>setShowConfirmPass((prev)=>!prev)} className='absolute text-xl bottom-0 right-4'>
                            {
                                showConfirmPassword?<BsEyeSlash/>:<AiOutlineEye/>
                            }

                        </span>
                    </label>
                    <button type='submit' className='bg-yellow-50 text-black font inter font-xl p-2 rounded-md my-2'>
                    Reset Password
                </button>
                </form>
                <Link to="/login">
                    <div className='flex flex-row items-center gap-2'>
                        <AiOutlineArrowLeft></AiOutlineArrowLeft>
                        <p>
                            Back to Login
                        </p>
                        </div>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword
