import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './slices/articlesSlice'
import authReducer from './slices/authSlice'
import eventsReducer from './slices/eventSlice'
import termsReducer from './slices/termSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
	reducer: {
		articles: articlesReducer,
		auth: authReducer,
		events: eventsReducer,
		terms: termsReducer,
		users: userReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
