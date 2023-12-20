import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";

export async function getEnrolledCourses(user, token) {
  // const {token} =useSelector((state)=>state.auth);

  let result = [];
  // dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "GET",
      profileEndpoints.GET_USER_ENROLLED_COURSES_API,
      user,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    // console.log("mkc");
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error);
    toast.error("Could Not Get Enrolled Courses");
  }
  toast.dismiss(toastId);
  // dispatch(setLoading(false))
  return result;
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiconnector(
      "GET",
      profileEndpoints.GET_INSTRUCTOR_DATA_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("GET_INSTRUCTOR_DATA_API response....", response);
    result = response?.data?.courses;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error);
    toast.error("Could Not Get Instructor Data");
  }
  toast.dismiss(toastId);
  return result;
}
