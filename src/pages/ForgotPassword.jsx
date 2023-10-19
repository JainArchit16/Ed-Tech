import React, { useState } from 'react'
import Loader from '../components/common/Loader'
import { useSelector } from 'react-redux'
import Button from '../components/core/HomePage/Button'
import { Link } from 'react-router-dom'
import {AiOutlineArrowLeft} from "react-icons/ai"

const ForgotPassword = () => {
    const [emailSent,setEmailSent]=useState(false);
    const [email,setEmail]=useState("");

    const {loading,setloading}=useSelector((state)=>state.auth);

    return (
        <div className='flex flex-col justify-center items-center h-[91vh] text-white w-full mx-auto'>
    {
        loading?(
            <Loader/>
        ):(

            <div className='flex flex-col justify-between w-[30%] gap-4'>
                {
                    emailSent?(
                        <div className='text-3xl font-semibold font-inter'>
                            Check Your Email
                        </div>
                    ):(
                        <div className='text-3xl font-semibold font-inter'>
                            Reset Your Password
                        </div>
                    )
                }
                {
                    emailSent?(
                        <div className='text-richblack-400 text-lg'>
                        {`We have sent the reset email to ${email}`}
                        </div>

                    ):(
                        <div className='text-richblack-400 text-lg'>
                            Have no fear. We'll email you 
                            instructions to reset your password. 
                            If you dont have access to your email 
                            we can try account recovery
                        </div>
                    )
                }
                {
                    !emailSent?(
                        <form>
                            <label for="email">
                            <p className='text-richblack-400 py-2'>Email Address</p>
                            <input
                                required
                                type='email'
                                name="email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                placeholder='Enter Your Email Address'
                                className='bg-richblack-600 p-2 rounded-lg w-[100%] mb-2 focus:outline-none'
                            /></label>
                        </form>
                    ):(
                        <div>

                        </div>
                    )
                }
                {
                    !emailSent?(
                        <Button active="true">
                            Reset Password
                        </Button>
                    ):(
                        <Button active="true">
                            Resend Email
                        </Button>
                    )
                }
                
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

export default ForgotPassword
