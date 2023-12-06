import toast from "react-hot-toast"
import { apiconnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

export const fetchCourseCategories=async(token)=>{
    let result = null
        try{
            const response=await apiconnector("GET",courseEndpoints.COURSE_CATEGORIES_API,
                null,
                {
                    Authorization: `Bearer ${token}`,
                }
            )
            console.log("COURSE_DETAILS_API API RESPONSE............", response)

            if (!response.data.success) {
            throw new Error(response.data.message)
            }
            result = response.data.allTags
        }
        catch(error)
        {
            console.log("COURSE_DETAILS_API API ERROR............", error)
            result = error.response.data
        }
        return result;
}

export const editCourseDetails=async(token,formData)=>{
    let result = null
  const toastId = toast.loading("Loading...")
    try{
        const response=await apiconnector("POST",courseEndpoints.EDIT_COURSE_API,formData,
        {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
        throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data

    }   
    catch(error)
    {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
  return result
}


//Not by me see

export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiconnector("POST", courseEndpoints.CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

//Not by me
export const updateSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", courseEndpoints.UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("UPDATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section")
    }
    toast.success("Course Section Updated")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

//Not by me

export const createSection = async (data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiconnector("POST", courseEndpoints.CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section")
    }
    toast.success("Course Section Created")
    result = response?.data?.updatedCourse
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
