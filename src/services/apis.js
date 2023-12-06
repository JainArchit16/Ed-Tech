
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints={
    RESETPASSWORD_API: BASE_URL+"/auth/reset-password",
    RESETPASSTOKEN_API: BASE_URL+"/auth/reset-password-token",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL+"/auth/login",
}

export const categories = {
    CATEGORIES_API : BASE_URL+"/course/showAllCategories",

};


export const settingsEndpoints={
    CHANGE_PASSWORD_API: BASE_URL+"/auth/changepassword",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact/contactUs",
  };


export const profileEndpoints={
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
}


export const courseEndpoints = {
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL+"/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
}

