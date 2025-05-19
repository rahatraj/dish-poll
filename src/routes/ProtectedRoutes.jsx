import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({ children }) {
  const {isLoggedIn} = useSelector((state)=> state.auth)

  const storedUser = localStorage.getItem("user")

  if (!isLoggedIn && !storedUser) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoutes
