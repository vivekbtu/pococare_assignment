import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Privateroutes from './PrivateRoutes'
import SignUp from '../pages/SignUp'
// import Navbar from './Navbar'
import Login from '../pages/Login'
import RefreshToken from '../pages/RefreshToken'

const AllRoutes = () => {
  return (
   <Routes>
    {/* <Route path="/" element={<Navbar />} /> */}
    <Route path="/" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Privateroutes><Dashboard /></Privateroutes>} />
    <Route path="/refresh" element={<RefreshToken />} />
   </Routes>
  )
}

export default AllRoutes