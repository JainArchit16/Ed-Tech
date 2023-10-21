import React from 'react'

const IconBtn = ({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses,
    type,
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onClick}
    type={type}
    className='bg-yellow-50 text-[#000814] p-3 rounded-lg font-inter'>
        {
            children?(
                <>
                <div className='flex flex-row gap-2 items-center text-lg'>

                {children}
                <span>
                    {text}
                </span>
                </div>
                </>
            ):(
                text
            )
        }
    </button>
  )
}

export default IconBtn
