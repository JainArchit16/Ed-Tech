import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  editCourse: false,
  paymentLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setEditCourse: (state, action) => {
      state.editCourse = action.payload;
    },
    //Not by me
    setPaymentLoading: (state, action) => {
      state.paymentLoading = action.payload;
    },
    //Not by me
    resetCourseState: (state) => {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
  },
});

export const {
  setStep,
  setCourse,
  setEditCourse,
  resetCourseState,
  setPaymentLoading,
} = courseSlice.actions;

export default courseSlice.reducer;
