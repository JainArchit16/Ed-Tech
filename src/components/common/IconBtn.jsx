import React from "react";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClasses,
  type,
  reverse = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${outline}?"bg-yellow-50 text-[#000814]":"bg-transparent text-yellow-50 border-[1px] border-yellow-50" p-3 rounded-lg font-inter ${customClasses}`}
    >
      {children ? (
        <>
          <div className="flex flex-row gap-2 items-center text-lg">
            {!reverse && (
              <>
                {children}
                <span>{text}</span>
              </>
            )}
            {reverse && (
              <>
                <span>{text}</span>
                {children}
              </>
            )}
          </div>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
