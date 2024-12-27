import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './slices/articlesSlice'
import authReducer from './slices/authSlice'
import eventsReducer from './slices/eventSlice'
import termsReducer from './slices/termSlice'

const store = configureStore({
	reducer: {
		articles: articlesReducer,
		auth: authReducer,
		events: eventsReducer,
		terms: termsReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
})

export default store
