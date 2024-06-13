import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout(navigate));
  }, []);
  return (
    <div>
      <Loader />
    </div>
  );
};

export default Logout;
