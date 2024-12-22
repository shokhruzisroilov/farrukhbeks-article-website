import { Routes, Route } from 'react-router-dom'
import Layouts from './layouts/Layouts'
import { Events, Grants, Home, Login, NotFound, Register } from './pages'
import { loginSuccess } from './store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
	const { user, token } = useSelector(state => state.auth)
	console.log(user, token)

	return (
		<Routes>
			<Route path='/' element={<Layouts />}>
				<Route index element={<Home />} />
				<Route path='/events' element={<Events />} />
				<Route path='/grants' element={<Grants />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
