import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoutes from './ProtectedRoutes'
import Home from '../pages/Home'
import Login from '../pages/Login'

function Approutes() {
  return (
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={
            <ProtectedRoutes>
                <Home/>
            </ProtectedRoutes>
        }/>

        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default Approutes