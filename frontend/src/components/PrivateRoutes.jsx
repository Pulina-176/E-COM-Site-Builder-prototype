import React , { useContext }  from 'react'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default function PrivateRoutes() {

  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Check if the token is available in local storage

  return (
    isAuthenticated ? <Outlet/> : <Navigate to='/admin-auth'/>
  )
}
