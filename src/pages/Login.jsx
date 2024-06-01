import loginImg from "../assets/Images/login.webp";
import Template from "../components/core/Auth/Template";

import Loader from "../components/common/Loader";
import { useSelector } from "react-redux";

//Not by me

function Login() {
  const { Loading } = useSelector((state) => state.auth);
  return (
    <>
      {Loading ? (
        <Loader />
      ) : (
        <Template
          title="Welcome Back"
          description1="Build skills for today, tomorrow, and beyond."
          description2="Education to future-proof your career."
          image={loginImg}
          formType="login"
        />
      )}
    </>
  );
}

export default Login;
