import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Loader from "../components/common/Loader";
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const {loading:authLoading}=useSelector((state)=>state.auth);
    const {loading:profileLoading}=useSelector((state)=>state.profile);


    if(authLoading || profileLoading)
    {
        return(
            <Loader/>
        )
    }
  return (
    <div className='relative w-[100vw] flex flex-row h-[120vh]'>
      <Sidebar/>
      <div className='h-[calc(100vh-3.5rem)] w-full'>
            
                <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
