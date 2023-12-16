import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

export const fetchCourseCategories = async (token) => {
  let result = null;
  try {
    const response = await apiconnector(
      "GET",
      courseEndpoints.COURSE_CATEGORIES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data.allTags;
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error);
    result = error.response.data;
  }
  return result;
};

export const editCourseDetails = async (token, formData) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.EDIT_COURSE_API,
      formData,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me see

export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.CREATE_COURSE_API,
      data,
      {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Course Details");
    }
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me
export const updateSection = async (data, token) => {
  var result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.UPDATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me

export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.CREATE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Course Section Created");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("CREATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.DELETE_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("DELETE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.DELETE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me

export const createSubSection = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.CREATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    result = response?.data?.updatedSection;
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me
export const updateSubSection = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.UPDATE_SUBSECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("UPDATE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Not by me
export const fetchInstructorCourses = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "GET",
      courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("INSTRUCTOR COURSES API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("INSTRUCTOR COURSES API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  // toast.success("Courses Fetched");
  return result;
};

//Not By me
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "DELETE",
      courseEndpoints.DELETE_COURSE_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("DELETE COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course");
    }
    toast.success("Course Deleted");
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

//Not by me
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
    console.log(result);
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

//Not by me
export const fetchCourseDetails = async (courseId) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.COURSE_DETAILS_API,
      {
        courseId,
      }
    );
    console.log("COURSE_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

export const createRating = async (data, token) => {
  let success = false;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.CREATE_RATING_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("CREATE RATING API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Create Rating");
    }
    success = true;
    toast.success("Course Rating Created");
  } catch (error) {
    console.log("CREATE Rating API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};

//Not by me
// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("Mark Complete Data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiconnector(
      "POST",
      courseEndpoints.LECTURE_COMPLETION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log(
      "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
      response
    );

    if (!response.data.message) {
      throw new Error(response.data.error);
    }
    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};
