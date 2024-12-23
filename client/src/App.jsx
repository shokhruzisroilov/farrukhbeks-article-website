import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layouts from './layouts/Layouts'
import AdminLayout from './layouts/AdminLayout'
import {
	ArticleDetails,
	Dashboard,
	DashboardArticleDetails,
	DashboardArticles,
	DashboardEvents,
	DashboardGrants,
	DashboardUsers,
	Events,
	Grants,
	Home,
	Login,
	NotFound,
	Register,
} from './pages'
import PrivateRoute from './routes/PrivateRoute'
import AdminRoute from './routes/AdminRoutes'

const App = () => {
	const { user, token } = useSelector(state => state.auth)

	return (
		<Routes>
			{/* Umumiy Layout */}
			<Route path='/' element={<Layouts />}>
				<Route index element={<Home />} />
				<Route path='/articles/:id' element={<ArticleDetails />} />
				<Route path='/events' element={<Events />} />
				<Route path='/grants' element={<Grants />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
			</Route>

			{/* Faqat tizimga kirgan foydalanuvchilar */}
			<Route element={<PrivateRoute />}>
				<Route path='/profile' element={<h2>Profile Page</h2>} />
			</Route>

			{/* Faqat admin foydalanuvchilar */}
			<Route element={<AdminRoute />}>
				<Route path='/admin' element={<AdminLayout />}>
					<Route index element={<Dashboard />} />
					<Route path='articles' element={<DashboardArticles />} />
					<Route path='articles/:id' element={<DashboardArticleDetails />} />
					<Route path='events' element={<DashboardEvents />} />
					<Route path='grants' element={<DashboardGrants />} />
					<Route path='users' element={<DashboardUsers />} />
				</Route>
			</Route>

			{/* 404 sahifa */}
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default App
