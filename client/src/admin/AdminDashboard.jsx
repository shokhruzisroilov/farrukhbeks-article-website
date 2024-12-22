import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
	return (
		<div className='admin-dashboard'>
			<h1 className='text-3xl font-semibold'>Admin Panel</h1>
			<div className='dashboard-content'>
				<div className='stats'>
					<h2 className='text-xl'>General Stats</h2>
					<ul>
						<li>Total Users: 120</li>
						<li>Active Users: 90</li>
						<li>New Posts: 25</li>
					</ul>
				</div>

				<div className='actions'>
					<h2 className='text-xl'>Actions</h2>
					<Link to='/admin/users' className='button'>
						Manage Users
					</Link>
					<Link to='/admin/posts' className='button'>
						Manage Posts
					</Link>
					<Link to='/admin/settings' className='button'>
						Settings
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
