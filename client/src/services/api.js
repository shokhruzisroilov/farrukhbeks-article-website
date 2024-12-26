import axios from 'axios'

const api = axios.create({
	baseURL: 'https://farrukhbek-article-website-yiz8.vercel.app/api',
	// baseURL: 'http://localhost:5000/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Interceptor qo'shish (masalan, authorization token qo'shish)
api.interceptors.request.use(
	config => {
		// Misol uchun tokenni olish va so'rovga qo'shish
		const token = localStorage.getItem('authToken')
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default api
