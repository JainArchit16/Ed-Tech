import toast from "react-hot-toast";
import {setLoading,setToken} from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { apiconnector } from "../apiconnector";
import {endpoints} from "../apis";
// import { useNavigate } from "react-router-dom";
import { resetCart } from "../../slices/cartSlice";
import { useEffect } from "react";

export const sendOtp=(email,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
                const response=await apiconnector("POST",endpoints.SENDOTP_API,{
                    email,
                    checkUserPresent: true,
                })
                console.log(response.data.success)

                if (!response.data.success) {
                    throw new Error(response.data.message)
                }
                toast.success("Otp Sent");
                navigate("/verifyemail");
        }
        catch(error)
        {
            console.log("SENDOTP API ERROR............", error)
            toast.error(error?.response?.data?.message)
            // dispatch(setProgress(100));
        }
        dispatch(setLoading(false));
    }
}

export const signUp=(accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiconnector("POST",endpoints.SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
              throw new Error(response.data.message)
            }
            // dispatch(setProgress(100));
            toast.success("Signup Successful")
            navigate("/login")
        }
        catch(error)
        {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
    }
}


export const login=(email,password,navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiconnector("POST",endpoints.LOGIN_API,{
                email,password
            })
            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            // dispatch(setProgress(100))
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            
            
            //Not by me Check once 


            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")

        }
        catch(error)
        {
            // dispatch(setProgress(100))
            console.log("LOGIN API ERROR............", error)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
    }
}


export const getPasswordResetToken=(email,setEmailSent)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response=await apiconnector("POST"
            ,endpoints.RESETPASSTOKEN_API
            ,{email})
            console.log("RESET PASSWORD TOKEN->",response);
            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }
            toast.success("Reset Email Sent");
            dispatch(setEmailSent(true));
        }
        catch(error)
        {
            console.log("RESET PASSWORD TOKEN ERROR");
            // toast.error("Mkc")
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword=(password,confirmPassword,token)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try
        {
            const response=await apiconnector("POST",
            endpoints.RESETPASSWORD_API,
            {
                token,password,confirmPassword
            });
            console.log("Reset Password Response",response);
            if(!response.data.success)
            {
                throw new Error(response.data.message);
            }
            toast.success("Password Reset Successfull");

        }
        catch(e)
        {
            console.log("Unable to reset Password");
        }
        dispatch(setLoading(false));

    }
}

//Not by me
export const logout=(navigate)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        
            dispatch(setToken(null))
            dispatch(setUser(null))
            dispatch(resetCart())
            navigate("/login")
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            toast.success("Logged Out")
        dispatch(setLoading(false));
        
    }
}