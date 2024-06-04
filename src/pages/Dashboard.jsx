import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (authLoading || profileLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full flex flex-row h-full min-h-[100vh]">
      <div className="min-h-[100vh] lg:w-[21%] md:w-[28%] xl:w-[17%]">
        <Sidebar />
      </div>
      <div className="h-full min-h-[100vh] lg:w-[78%] md:w-[72%] xl:w-[80%] w-[80%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
