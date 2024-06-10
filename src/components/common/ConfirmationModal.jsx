// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ modalData }) => {
  const { text1, text2, btn1Text, btn2Text, btn1Handler, btn2Handler } =
    modalData;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
      {/* Apply backdrop-filter for blur effect */}
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 rounded-lg shadow-lg flex flex-col gap-4 bg-richblack-800">
        <p className="text-lg sm:text-xl text-white">{text1}</p>
        <p className="text-sm sm:text-base text-[#838894]">{text2}</p>
        <div className="flex flex-col sm:flex-row justify-end mt-4 gap-2">
          <button
            onClick={btn1Handler}
            className="w-full sm:w-auto px-4 py-2 bg-yellow-50 font-inter text-black rounded-md hover:bg-yellow-100 font-semibold"
          >
            {btn1Text}
          </button>
          <button
            onClick={btn2Handler}
            className="w-full sm:w-auto px-4 py-2 text-[#838894] rounded-md hover:text-pure-greys-400"
          >
            {btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
