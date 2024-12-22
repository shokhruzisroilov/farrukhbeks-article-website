import { useState } from 'react'

function UserProfile({ user, handleLogout }) {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDropdown = () => {
		setIsOpen(!isOpen)
	}

	return (
		<div className='relative'>
			<button
				onClick={toggleDropdown}
				className='flex items-center gap-2 cursor-pointer'
			>
				<span className='text-sm font-medium'>{user.username}</span>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					strokeWidth={1.5}
					stroke='currentColor'
					className='w-4 h-4'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M19.5 8.25l-7.5 7.5-7.5-7.5'
					/>
				</svg>
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-2 w-64 bg-white text-black border rounded-lg shadow-lg z-50'>
					<ul className='py-2'>
						<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							{user.email}
						</li>
						{/* isAdmin true bo'lsa ko'rsatiladi */}
						{user.isAdmin && (
							<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
								<a href='/dashboard'>Dashboard</a>
							</li>
						)}
						<li
							onClick={handleLogout}
							className='px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer'
						>
							Chiqish
						</li>
					</ul>
				</div>
			)}
		</div>
	)
}

export default UserProfile
