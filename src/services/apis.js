
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints={
    RESETPASSWORD_API: BASE_URL+"/auth/reset-password",
    RESETPASSTOKEN_API: BASE_URL+"/auth/reset-password-token",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
}

export const categories = {
    CATEGORIES_API : BASE_URL+"/course/showAllCategories",

};


export const settingsEndpoints={
    CHANGE_PASSWORD_API: BASE_URL+"/auth/changepassword"
}