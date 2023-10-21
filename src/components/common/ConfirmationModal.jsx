// ConfirmationModal.js
import React from 'react';

//Not By Me
const ConfirmationModal = ({ modalData }) => {
  const { text1, text2, btn1Text, btn2Text, btn1Handler, btn2Handler } = modalData;

  return (
    <div className="fixed inset-0 flex flex-col gap-8 items-center justify-center z-50 backdrop-blur-sm">
      {/* Apply backdrop-filter for blur effect */}
      <div className="w-[25%] p-4 rounded-lg shadow-lg flex flex-col gap-2 bg-richblack-800">
        <p className='text-xl text-white'>{text1}</p>
        <p className='text-[#838894]'>{text2}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={btn1Handler}
            className="px-4 py-2 bg-yellow-50 font-inter text-black rounded-md hover:bg-yellow-100 mr-2 font-semibold"
          >
            {btn1Text}
          </button>
          <button
            onClick={btn2Handler}
            className="px-4 py-2 text-gray-700 rounded-md text-[#838894]"
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
