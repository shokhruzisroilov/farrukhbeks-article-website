import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { SidebarDashboard } from '../components'

const AdminLayout = () => {
	return (
		<div className='flex flex-col md:flex-row'>
			<SidebarDashboard />
			<Outlet />
		</div>
	)
}

export default AdminLayout
