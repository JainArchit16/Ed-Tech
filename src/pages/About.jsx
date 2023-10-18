import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";


const About = () => {
  return (
            <div className='bg-richblack-900 flex flex-col h-[100%]'>


            <div className='bg-[#161D29] flex flex-col w-full h-[50%] items-center relative'>
                        <div className='flex flex-col w-[70%] justify-center items-center my-24'>
            
                            <p className='text-richblack-5 text-4xl font-semibold font-inter w-[70%] text-center mb-10'>
                            Driving Innovation in Online Education for a<HighlightText text={" Brighter Future"}/>
                            </p>
                            <p className='text-lg font-inter text-[#838894] text-center mb-10'>
                            Studynotion is at the forefront of driving innovation in online education. 
                            We're passionate about creating a 
                            brighter future by offering cutting-edge courses, 
                            leveraging emerging technologies, and nurturing a vibrant learning community.
                            </p>
                            <div className='flex flex-row justify-center items-center gap-8 absolute translate-y-[85%]'>
                                <img src={image1}/>
                                <img src={image2}/>
                                <img src={image3}/>
                            </div>
                        </div>
                </div>
                    <div className="flex flex-col justify-center items-center mt-52">

                        <div className='text-white text-4xl font-inter text-semibold text-center my-10 w-[75%]'>
                        We are passionate about revolutionizing the way we learn. 
                        Our innovative platform <HighlightText text={"combines technology"}/>,<HighlightText text={" expertise"}/>, and 
                        community to create an unparalleled educational experience.
                        </div>
                    </div>
                    <div>

                    </div>
                    </div>   
        
  )
}

export default About
