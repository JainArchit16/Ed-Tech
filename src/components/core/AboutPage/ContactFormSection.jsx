import React from 'react'
import ContactUsForm from '../../contactUs/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <h1 className='text-center text-4xl font-semibold text-[#F1F2FF]'>
        Get in Touch
      </h1>
      <p className='text-center text-richblack-300 mt-2'>
        We'd love to here for you, Please fill out this form.
      </p>
        <div className='w-full'>

        <ContactUsForm />

        </div>

    </div>
  )
}

export default ContactFormSection