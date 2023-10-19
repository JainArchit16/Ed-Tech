import toast from "react-hot-toast";
import {setLoading,setToken} from "../../slices/authSlice";
import { apiconnector } from "../apiconnector";
import {endpoints} from "../apis";



//Not by me check
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiconnector("POST", endpoints.SIGNUP_API, {
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
      } catch (error) {
        // dispatch(setProgress(100));
        console.log("SIGNUP API ERROR............", error)
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }

//Not by me
export function sendOtp(email, navigate) {
return async (dispatch) => {
    // const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
    const response = await apiconnector("POST", endpoints.SENDOTP_API, {
        email,
        checkUserPresent: true,
    })
    // dispatch(setProgress(100));
    console.log("SENDOTP API RESPONSE............", response)

    console.log(response.data.success)

    if (!response.data.success) {
        throw new Error(response.data.message)
    }

    toast.success("OTP Sent Successfully")
    navigate("/verify-email")
    } catch (error) {
    console.log("SENDOTP API ERROR............", error)
    toast.error(error?.response?.data?.message)
    // dispatch(setProgress(100));
    }
    dispatch(setLoading(false))
    // toast.dismiss(toastId)
}
}









//Done by me
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