import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { useState } from "react";
import { useEffect } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementsField from "./RequirementsField";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  const getCategories = async (token) => {
    setLoading(true);
    const categories = await fetchCourseCategories(token);
    if (categories.length > 0) {
      setCourseCategories(categories);
    }
    setLoading(false);
  };

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    ) {
      return true;
    }
    return false;
  };

  const onSubmit = async (data) => {
    // console.log(data)

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        // console.log(data)
        formData.append("courseId", course._id);
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true);
        const result = await editCourseDetails(token, formData);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      } else {
        toast.error("No changes made to the form");
      }
      return;
    }

    //Not by me
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    // console.log("datawali" + data.courseCategory);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage", data.courseImage);
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories(token);

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      // console.log(JSON.parse(course.tag));
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category._id);
      {
        console.log(course.category);
      }
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    // console.log(courseCategories);
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 my-12"
      >
        {/* Course Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseTitle">
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            {...register("courseTitle", { required: true })}
            className="form-style w-full bg-[#2C333F] py-2 px-3 rounded-lg focus:outline-none"
          />
          {errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is required
            </span>
          )}
        </div>
        {/* Course Short Description */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseShortDesc">
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full bg-[#2C333F] py-2 px-3 rounded-lg focus:outline-none"
          />
          {errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )}
        </div>
        {/* Course Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="coursePrice">
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              id="coursePrice"
              placeholder="Enter Course Price"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
              className="form-style w-full !pl-12 bg-[#2C333F] py-2 px-3 rounded-lg focus:outline-none"
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          </div>
          {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is required
            </span>
          )}
        </div>

        {/* Course Category */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="coursePrice">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <select
              id="courseCategory"
              className="form-style w-full !pl-12 bg-[#2C333F] py-2 px-3 rounded-lg focus:outline-none"
              {...register("courseCategory", { required: true })}
            >
              <option value="" disabled selected>
                Choose a Category
              </option>

              {!loading &&
                courseCategories?.map((category, indx) => (
                  <option
                    key={indx}
                    value={category?._id}
                    selected={
                      editCourse && category?._id === course.category._id
                    }
                  >
                    {category?.name}
                  </option>
                ))}
            </select>
          </div>
          {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
        </div>

        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags"
          register={register}
          error={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Not by me see it */}
        <Upload
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
          placeholder="Enter Video Thumbnail"
        />

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
            Benefits of the Course <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <textarea
              id="courseBenefits"
              placeholder="Enter Description"
              {...register("courseBenefits", { required: true })}
              className="form-style resize-x-none min-h-[130px] w-full bg-[#2C333F] py-2 px-3 rounded-lg focus:outline-none"
            />
          </div>
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Benefits is required
            </span>
          )}
        </div>

        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          placeholder="Enter Course Requirements"
          register={register}
          error={errors}
          setValue={setValue}
          getValues={getValues}
        />
        <div className="flex gap-5 w-[100%] flex-row-reverse">
          <IconBtn text={!editCourse ? "Next" : "Save Changes"} />
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className="flex p-2 bg-richblack-600 rounded-lg"
            >
              Continue Without Saving
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
