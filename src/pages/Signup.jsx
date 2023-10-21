import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";



//Not by me


function Signup() {
  const {Loading} = useSelector((state)=>state.auth);
  return (
    Loading?(
        <Loader/>
    ):(
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
    )
  )
}

export default Signup