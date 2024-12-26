import { Link, NavLink } from 'react-router-dom'
import {
	FaBars,
	FaFacebook,
	FaInstagram,
	FaTelegram,
	FaXmark,
	FaTwitter,
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
		{ path: '/articles', link: 'Maqolalar' },
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

				{/* Menu icons for larger devices */}
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
						<FaTwitter />
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

				{/* Mobile menu button and profile icon */}
				<div className='md:hidden flex items-center gap-4'>
					{/* Profile icon for mobile */}
					{user ? (
						<UserProfile user={user} handleLogout={handleLogout} />
					) : (
						<Link to='/login'>
							<button className='bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in'>
								Kirish
							</button>
						</Link>
					)}

					{/* Mobile menu button */}
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
					className={`md:hidden gap-12 text-lg space-y-4 px-4 py-6 bg-white transition-all ease-in-out duration-300 ${
						isMenuOpen ? 'block' : 'hidden'
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
				</ul>
			</div>
		</header>
	)
}

export default Header
