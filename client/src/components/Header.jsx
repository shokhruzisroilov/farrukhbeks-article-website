import { Link, NavLink } from 'react-router-dom'
import {
	FaBars,
	FaFacebook,
	FaInstagram,
	FaTelegram,
	FaXmark,
	FaXTwitter,
} from 'react-icons/fa6'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UserProfile from './UserProfile'
import { logout } from '../store/slices/authSlice'

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { user } = useSelector(state => state.auth)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const handleLogout = () => {
		dispatch(logout())
		navigate('/')
	}

	const activeClazz = 'text-orange-500 underline underline-offset-4'

	// navItems
	const navItems = [
		{ path: '/', link: 'Bosh sahifa' },
		{ path: '/events', link: 'Tadbirlar' },
		{ path: '/grants', link: 'Grantlar' },
	]

	return (
		<header className='bg-black text-white fixed top-0 left-0 right-0'>
			<nav className='px-4 py-4 max-w-7xl mx-auto flex justify-between items-center'>
				<Link to='/' className='text-xl font-bold text-white'>
					Farrukhbek<span className='text-orange-500'>UZ</span>
				</Link>

				{/* Nav items for larger devices */}
				<ul className='md:flex gap-12 text-lg hidden'>
					{navItems.map(item => (
						<li className='text-white' key={item.path}>
							<NavLink
								className={({ isActive }) => (isActive ? activeClazz : '')}
								to={item.path}
							>
								{item.link}
							</NavLink>
						</li>
					))}
				</ul>

				{/* Menu icons */}
				<div className='text-white lg:flex gap-4 items-center hidden'>
					<a href='/' className='hover:text-orange-500'>
						<FaFacebook />
					</a>
					<a href='/' className='hover:text-orange-500'>
						<FaInstagram />
					</a>
					<a href='/' className='hover:text-orange-500'>
						<FaTelegram />
					</a>
					<a href='/' className='hover:text-orange-500'>
						<FaXTwitter />
					</a>
					{user ? (
						<UserProfile user={user} handleLogout={handleLogout} />
					) : (
						<Link to='/login'>
							<button className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in'>
								Kirish
							</button>
						</Link>
					)}
				</div>

				{/* Mobile menu button */}
				<div className='md:hidden'>
					<button className='cursor-pointer' onClick={toggleMenu}>
						{isMenuOpen ? (
							<FaXmark className='w-5 h-5' />
						) : (
							<FaBars className='w-5 h-5' />
						)}
					</button>
				</div>
			</nav>

			{/* Mobile menu items */}
			<div>
				<ul
					className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 bg-white ${
						isMenuOpen ? 'fixed top-0 left-0 w-full' : 'hidden'
					}`}
				>
					{navItems.map(item => (
						<li className='text-black' key={item.path}>
							<NavLink
								onClick={toggleMenu}
								className={({ isActive }) => (isActive ? activeClazz : '')}
								to={item.path}
							>
								{item.link}
							</NavLink>
						</li>
					))}
					<li>
						{user ? (
							<div className='text-center'>
								<span className='block text-black mb-2'>
									Salom, {user.username}!
								</span>
								<button
									onClick={() => {
										handleLogout()
										toggleMenu()
									}}
									className='bg-red-600 px-4 py-2 text-white rounded hover:bg-red-700'
								>
									Chiqish
								</button>
							</div>
						) : (
							<Link to='/login' onClick={toggleMenu}>
								<button className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-orange-700 text-white w-full'>
									Kirish
								</button>
							</Link>
						)}
					</li>
				</ul>
			</div>
		</header>
	)
}

export default Header
