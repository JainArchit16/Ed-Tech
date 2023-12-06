import React, { useEffect } from 'react';
import { useState } from 'react';
import {MdClose} from "react-icons/md";
import { useSelector } from 'react-redux';

const ChipInput = ({
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
}) => {



  const { editCourse, course } = useSelector((state) => state.course)
  

  //Not by me

    useEffect(() => {
      if (editCourse) {
        // console.log(course)
        setChips(course?.instructions)
      }
      register(name, { required: true, validate: (value) => value.length > 0 })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const [chips, setChips] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            const chipValue = event.target.value.trim();
            if (!chips.includes(chipValue) && chipValue) {
                const chipValues = [...chips, chipValue];
                setChips(chipValues);
                event.target.value = "";
            }
        }
    };

    useEffect(() => {
      setValue(name, chips)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips])

    //till here not me
    const handleDelete = (chip) => {
        const deleted = chips.filter((e) => e !== chip);
        setChips(deleted);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label className="text-sm text-richblack-5" htmlFor={name}>
                {label} <sup className="text-pink-200">*</sup>
            </label>

           
            <input
                type='text'
                id={name}
                name={name}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                className="form-style w-full bg-[#2C333F] py-2 px-3 rounded-lg focus:outline-none"
            />



<div className='flex flex-row gap-2 my-2'>
{chips.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {chips.map((chip, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{chip}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleDelete(chip)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
            </div>



        </div>
    );
}

export default ChipInput;
