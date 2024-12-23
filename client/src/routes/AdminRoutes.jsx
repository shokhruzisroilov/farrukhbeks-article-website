import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
	const { user } = useSelector(state => state.auth)

	// Foydalanuvchi admin emas bo'lsa, Home sahifasiga yo'naltiriladi
	return user?.isAdmin ? <Outlet /> : <Navigate to='/' />
}

export default AdminRoute
