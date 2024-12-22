import axios from './api' // axios instance

const AuthService = {
	// Foydalanuvchini ro'yxatdan o'tkazish
	async userRegister(userData) {
		const response = await axios.post('/auth/register', userData)
		return response.data // Ro'yxatdan o'tishdan so'nggi javob
	},

	// Foydalanuvchini tizimga kirish
	async userLogin(userData) {
		const response = await axios.post('/auth/login', userData)
		return response.data // Login va tokenni qaytaradi
	},
}

export default AuthService
