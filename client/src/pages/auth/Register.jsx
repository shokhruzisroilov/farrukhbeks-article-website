import React, { useState, useEffect, useCallback } from 'react' // Ensure useCallback is imported
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	registerStart,
	registerSuccess,
	registerFailure,
} from '../../store/slices/authSlice'
import AuthService from '../../services/authServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { loading, error } = useSelector(state => state.auth)

	const errorMessage = useCallback(() => {
		return Object.keys(error).map(name => {
			const msg = Array.isArray(error[name])
				? error[name].join(' ')
				: error[name]
			return `${msg}`
		})
	}, [error])

	useEffect(() => {
		if (error !== null) {
			const messages = errorMessage()
			messages.forEach(msg => toast.error(msg)) // Show error toast
		}
	}, [error])

	const handleRegister = async e => {
		e.preventDefault()

		dispatch(registerStart())
		const userData = { username, email, password, confirmPassword }

		try {
			const response = await AuthService.userRegister(userData)
			dispatch(registerSuccess(response))
			navigate('/login')
		} catch (err) {
			dispatch(registerFailure(err.response.data))
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<ToastContainer />
			<div className='w-full max-w-md p-4 sm:p-8 bg-white rounded-lg shadow-lg'>
				<h2 className='text-3xl font-semibold text-center text-gray-700 mb-6'>
					Ro'yxatdan O'tish
				</h2>
				<form onSubmit={handleRegister} className='space-y-4'>
					<div>
						<label
							htmlFor='username'
							className='block text-sm font-medium text-gray-600'
						>
							Foydalanuvchi ismi
						</label>
						<input
							type='text'
							id='username'
							value={username}
							onChange={e => setUsername(e.target.value)}
							className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600'
							placeholder='Foydalanuvchi ismini kiriting'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium text-gray-600'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600'
							placeholder='Email kiriting'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-600'
						>
							Parol
						</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600'
							placeholder='Parol kiriting'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='confirmPassword'
							className='block text-sm font-medium text-gray-600'
						>
							Parolni tasdiqlang
						</label>
						<input
							type='password'
							id='confirmPassword'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600'
							placeholder='Parolni tasdiqlang'
							required
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className={`w-full py-2 ${
							loading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'
						} text-white rounded-md shadow-md`}
					>
						{loading ? 'Yuklanmoqda...' : "Ro'yxatdan o'tish"}
					</button>
				</form>
				<div className='mt-4 text-center'>
					<p className='text-sm text-gray-600'>
						Akkauntingiz bormi?{' '}
						<a href='/login' className='text-orange-600 hover:underline'>
							Kirish
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Register
