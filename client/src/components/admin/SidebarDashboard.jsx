import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../store/slices/authSlice'
import { FiMenu, FiX } from 'react-icons/fi'

const SidebarDashboard = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	// Function to handle user logout
	const handleLogout = () => {
		dispatch(logout()) // Dispatch logout action
		navigate('/') // Navigate to the home page after logout
	}

	// Toggle the sidebar visibility (open or close)
	const toggleSidebar = () => {
		setIsOpen(!isOpen) // Toggle the sidebar state
	}

	return (
		<>
			{/* Mobile Navbar: This is displayed on mobile devices */}
			<div className='bg-gray-800 text-white p-4 flex justify-between items-center md:hidden'>
				<h2 className='text-xl font-bold'>Dashboard</h2>
				<button onClick={toggleSidebar} className='text-2xl'>
					{/* Icon toggle button for opening/closing sidebar */}
					{isOpen ? <FiX /> : <FiMenu />}
				</button>
			</div>

			{/* Sidebar: Main sidebar for desktop and mobile */}
			<div
				className={`fixed md:static w-64 min-h-screen p-4 bg-gray-800 text-white flex flex-col shadow-lg z-50 transition-all duration-300 ${
					isOpen ? 'translate-x-0' : '-translate-x-full'
				} md:translate-x-0 md:flex`}
			>
				<h2 className='text-xl font-bold text-center py-4 border-b border-gray-700'>
					FARRUHBEKUZ
				</h2>
				{/* List of Navigation Links */}
				<ul className='flex-1 mt-4 space-y-2'>
					{/* Home link: Only active when the exact '/admin' path is matched */}
					<NavLink
						to='/admin'
						className={({ isActive }) =>
							`block px-4 py-4 hover:bg-gray-700 cursor-pointer rounded-md ${
								isActive ? 'bg-gray-700' : ''
							}`
						}
						onClick={toggleSidebar}
						end // Ensure it only activates on the exact '/admin' path
					>
						<li>🏠 Bosh sahifa</li>
					</NavLink>

					{/* Articles link */}
					<NavLink
						to='/admin/articles'
						className={({ isActive }) =>
							`block px-4 py-4 hover:bg-gray-700 cursor-pointer rounded-md ${
								isActive ? 'bg-gray-700' : ''
							}`
						}
						onClick={toggleSidebar}
					>
						<li>📝 Maqolalar</li>
					</NavLink>

					{/* Events link */}
					<NavLink
						to='/admin/events'
						className={({ isActive }) =>
							`block px-4 py-4 hover:bg-gray-700 cursor-pointer rounded-md ${
								isActive ? 'bg-gray-700' : ''
							}`
						}
						onClick={toggleSidebar}
					>
						<li>🎉 Tadbirlar</li>
					</NavLink>

					{/* Grants link */}
					<NavLink
						to='/admin/terms'
						className={({ isActive }) =>
							`block px-4 py-4 hover:bg-gray-700 cursor-pointer rounded-md ${
								isActive ? 'bg-gray-700' : ''
							}`
						}
						onClick={toggleSidebar}
					>
						<li>🏅 Atamalar</li>
					</NavLink>

					{/* Users link */}
					<NavLink
						to='/admin/users'
						className={({ isActive }) =>
							`block px-4 py-4 hover:bg-gray-700 cursor-pointer rounded-md ${
								isActive ? 'bg-gray-700' : ''
							}`
						}
						onClick={toggleSidebar}
					>
						<li>👥 Foydalanuvchilar</li>
					</NavLink>

					{/* Logout button */}
					<li
						onClick={handleLogout}
						className='px-4 py-2 hover:bg-gray-700 cursor-pointer rounded-md text-center text-red-500'
					>
						🚪 Chiqish
					</li>
				</ul>

				{/* Footer section */}
				<div className='mt-auto mb-4'></div>

				{/* Copyright Footer */}
				<div className='p-4 text-sm border-t border-gray-700 text-center'>
					&copy; 2024 Dashboard
				</div>
			</div>

			{/* Mobile background overlay when sidebar is open */}
			{isOpen && (
				<div
					className='fixed inset-0 bg-black opacity-50 md:hidden z-40'
					onClick={toggleSidebar}
				></div>
			)}
		</>
	)
}

export default SidebarDashboard
