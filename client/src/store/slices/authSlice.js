import { createSlice } from '@reduxjs/toolkit'

// LocalStorage-dan boshlang'ich qiymatlarni olish
const initialUser = JSON.parse(localStorage.getItem('user')) || null
const initialToken = localStorage.getItem('token') || null

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: initialUser,
		token: initialToken,
		loading: false,
		error: null,
		register: null,
	},
	reducers: {
		// Ro'yxatdan o'tish
		registerStart: state => {
			state.loading = true
			state.error = null
		},
		registerSuccess: (state, action) => {
			state.loading = false
			state.register = action.payload
			state.error = null
		},
		registerFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},

		// Tizimga kirish
		loginStart: state => {
			state.loading = true
			state.error = null
		},
		loginSuccess: (state, action) => {
			state.loading = false
			state.user = action.payload.user
			state.token = action.payload.token
			state.error = null

			// localStorage-ga saqlash
			localStorage.setItem('user', JSON.stringify(action.payload.user))
			localStorage.setItem('token', action.payload.token)
		},
		loginFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},

		// Tizimdan chiqish
		logout: state => {
			state.user = null
			state.token = null
			state.loading = false
			state.error = null

			// localStorage-dan tozalash
			localStorage.removeItem('user')
			localStorage.removeItem('token')
		},
	},
})

export const {
	registerStart,
	registerSuccess,
	registerFailure,
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
} = authSlice.actions

export default authSlice.reducer
