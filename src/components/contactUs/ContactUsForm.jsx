import React, { useEffect, useState } from "react";
import countrycode from "../../data/countrycode.json";
import { useForm } from "react-hook-form";
import { apiconnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import toast from "react-hot-toast";
import Loader from "../common/Loader";

const ContactUsForm = () => {
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const submitContactForm = async (data) => {
    setloading(true);
    try {
      const {
        firstname: firstName,
        lastname: lastName,
        email,
        phoneNo,
        message,
      } = data;
      console.log("maza");
      const response = await apiconnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        { firstName, lastName, email, message, phoneNo }
      );
      toast.success("Message Sent Successfully");
      console.log("Response on submit form", response);
    } catch (error) {
      console.log(error.message);
    }
    setloading(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit(submitContactForm)}
          className="flex flex-col gap-1 text-[#F1F2FF] justify-center"
        >
          <div className="flex md:flex-row text-[#F1F2FF] my-8 font-inter w-full flex-col gap-4 md:gap-8">
            <label for="firstname w-[50%]">
              <p>First Name</p>
              <input
                required
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter First Name"
                {...register("firstname", { required: true })}
                className="bg-[#161D29] p-2 rounded-md mt-3 focus:outline-none w-[100%]"
              />
            </label>
            {errors.firstname && <span>Please Enter Your First Name</span>}

            <label for="lastname w-[50%]">
              <p>Last Name</p>
              <input
                required
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter Last Name"
                {...register("lastname")}
                className="bg-[#161D29] p-2 rounded-md mt-3 focus:outline-none w-[100%]"
              />
            </label>
          </div>
          <label for="email">
            <p className="text-[#F1F2FF]">Email Address</p>
            <input
              type="email"
              placeholder="Enter Email Address"
              id="email"
              name="email"
              {...register("email", { required: true })}
              className="bg-[#161D29] p-2 rounded-md mt-3 w-full focus:outline-none"
            />
            {errors.email && <span>Please Enter Your Email Address</span>}
          </label>

          <label for="phoneNo" className="my-4">
            <p className="text-[#F1F2FF]">Phone Number</p>
            <div className="flex flex-row justify-center items-center gap-6">
              <select
                className="bg-[#161D29] p-2 rounded-md mt-3 focus:outline-none w-[18%]"
                name="dropdown"
                id="dropdown"
                {...register("countrycode", { required: true })}
              >
                {countrycode.map((elem, index) => (
                  <option key={index} selected={elem.code === "+91"}>
                    {elem.code} - {elem.country}
                  </option>
                ))}
              </select>
              <input
                type="number"
                maxLength={10}
                placeholder="12345 67890"
                id="phoneNo"
                name="phoneNo"
                {...register("phoneNo", {
                  required: { value: true, message: "Message Required" },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
                className="bg-[#161D29] p-2 rounded-md mt-3 w-full"
              />
              {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
            </div>
          </label>

          <label for="message">
            <p className="text-[#F1F2FF]">Message</p>
            <textarea
              placeholder="Enter Message"
              id="message"
              name="message"
              {...register("message", { required: true })}
              className="bg-[#161D29] rounded-md mt-3 w-full focus:outline-none p-3"
            />
            {errors.message && <span>Please Enter Your Message</span>}
          </label>

          <button
            type="submit"
            className="bg-yellow-50 p-2 rounded-md text-black font-semibold my-4"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUsForm;
