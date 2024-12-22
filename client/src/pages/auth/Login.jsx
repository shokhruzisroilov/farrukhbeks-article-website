import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	loginStart,
	loginSuccess,
	registerSuccess,
} from '../../store/slices/authSlice'
import AuthService from '../../services/authServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { loading, register } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (register !== null) {
			toast.success(register.message)
		}
		dispatch(registerSuccess(null))
	}, [register])

	const handleLogin = async e => {
		e.preventDefault()
		dispatch(loginStart())

		try {
			const response = await AuthService.userLogin({ email, password })
			dispatch(loginSuccess(response))
			navigate('/')
		} catch (error) {
			toast.error(error.response.data?.message)
		}
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<ToastContainer />
			<div className='w-full max-w-md bg-white p-8 rounded-lg shadow-lg'>
				<h2 className='text-3xl font-semibold text-center text-gray-700 mb-6'>
					Kirish
				</h2>
				<form onSubmit={handleLogin} className='space-y-4'>
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

					<button
						type='submit'
						className={`w-full py-2 rounded-md shadow-md focus:outline-none ${
							loading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-orange-600 hover:bg-orange-700 text-white'
						}`}
						disabled={loading}
					>
						{loading ? 'Yuklanmoqda...' : 'Kirish'}
					</button>
				</form>

				{/* <div className='mt-4 text-center'>
					<a href='/login' className='text-sm text-orange-600 hover:underline'>
						Parolni unutdingizmi?
					</a>
				</div> */}
				<div className='mt-4 text-center'>
					<p className='text-sm text-gray-600'>
						Akkauntingiz yo'qmi?{' '}
						<a href='/register' className='text-orange-600 hover:underline'>
							Ro'yxatdan o'tish
						</a>
					</p>
				</div>
			</div>
		</div>
	)
}

export default Login
