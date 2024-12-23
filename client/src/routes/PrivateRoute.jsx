import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
	const { token } = useSelector(state => state.auth)

	// Token yo'q bo'lsa, Login sahifasiga yo'naltiriladi
	return token ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
