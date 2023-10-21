import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    // const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);

    if(token===null)
    {
        return <Navigate to="/login"/>
    }
    return children;
  
  
}

export default PrivateRoute
