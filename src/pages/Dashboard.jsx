import React from 'react'
import { useSelector } from 'react-redux'
import Loader from "../components/common/Loader";
import Sidebar from '../components/core/Dashboard/Sidebar';
import { Outlet} from 'react-router-dom';


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
    <div className='w-[100vw] flex flex-row h-full min-h-[100vh]'>
      <Sidebar/>
      <div className='w-full h-full min-h-[100vh]'>
            
                <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
