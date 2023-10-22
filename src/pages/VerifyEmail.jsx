import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineArrowLeft} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom';
import { signUp,sendOtp } from '../services/operations/authAPI';
import Loader from '../components/common/Loader';


const VerifyEmail = () => {
    const {Loading,signupData} =useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const [otp,setotp]=useState("");
    const navigate=useNavigate();

    useEffect(()=>{
        if(!signupData)
        {
            navigate("/signup");
        }
    },[])

    const handleResend=(e)=>{
        e.preventDefault()
        dispatch(sendOtp(signupData.email,navigate))
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const {
            accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        }=signupData;
        dispatch(signUp( accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate));
        
    }
  return (
    <div className='flex flex-col justify-center items-center w-screen h-[91vh] text-white'>
    {
        Loading?(
                <Loader></Loader>
            ):(
                <div className='flex flex-col justify-between w-[30%] text-white gap-4'>
                <h1 className='text-3xl font-semibold font-inter'>
                   Verify Email
                </h1>
                <p className='text-richblack-400 text-lg'>
                    A verification mail has been sent to you.Enter the code Below.
                </p>
                <form onSubmit={handleSubmit} className='mt-8'>
                {
                    <OTPInput
                    value={otp}
                    onChange={setotp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center bg-[#161D29]"
                    focusStyle="border-[5px] border-red-500"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex justify-between gap-4"
                    renderInput={(props) => <input {...props} />} />
                }
                    
                    <button type='submit' className='bg-yellow-50 text-black font inter font-xl p-2 rounded-md mt-12'>
                        Verify Email
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
                <button onClick={handleResend}>Resend OTP</button>
                </div>
            )
    }
    </div>
      
  )
}

export default VerifyEmail
