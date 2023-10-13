import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({children,linkto,active=false}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center px-6 py-3 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black":"bg-richblack-800 text-white"}
        transition-all duration-200 hover:scale-95 w-fit max-w-maxContent`}>
            {children}
        </div>
    </Link>
  )
}

export default Button
