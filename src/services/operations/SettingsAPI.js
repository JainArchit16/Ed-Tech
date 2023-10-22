import { apiconnector } from "../apiconnector";
import {setLoading} from "../../slices/profileSlice";
import { settingsEndpoints } from "../apis";
import toast from "react-hot-toast";
import { setUser } from "../../slices/profileSlice";
import {logout} from "../operations/authAPI";

//Error Fixed By me but still see it again

export const uploadProfilePicture=(user,token,formData)=>{
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiconnector(
                "PUT",
                settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                }
              )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
              )
        
              if (!response.data.success) {
                throw new Error(response.data.message)
              }
              toast.success("Display Picture Updated Successfully");
              dispatch(setUser({...user,image:response.data.user.image}))
              console.log("setting in pfp",user);
            
        }
        catch(error)
        {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        dispatch(setLoading(false))
               
    }
}

export const updateProfile=(token,data)=>{
  return async(dispatch)=>{
      try{
        // console.log(token);
        const response = await apiconnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, data, {
          Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)
        
        console.log(response.data.updatedUserDetails);
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.updatedUserDetails.image
        ? response.data.updatedUserDetails.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

      dispatch(
        setUser({ ...response.data.updatedUserDetails, image: userImage })
      )
      toast.success("Profile Updated Successfully")
      }
      catch(error)
      {
        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
      }
  }
}


export const deleteProfile=(user,token,navigate)=>{
  return async(dispatch)=>{
    dispatch(setLoading(true));
    try{
      const response = await apiconnector("DELETE", settingsEndpoints.DELETE_PROFILE_API, user, {
        Authorization: `Bearer ${token}`,
      })
      localStorage.clear()
      sessionStorage.clear()
      console.log("DELETE_PROFILE_API API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Profile Deleted Successfully")
      dispatch(logout(navigate))
    }
    catch(error)
    {
      console.log("DELETE_PROFILE_API API ERROR............", error)
      toast.error("Could Not Delete Profile")
    }
    dispatch(setLoading(false));
  }
}