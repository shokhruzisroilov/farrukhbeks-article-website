// src/slices/articleSlice.js
import { createSlice } from '@reduxjs/toolkit'

const articleSlice = createSlice({
	name: 'articles',
	initialState: {
		articles: [],
		loading: false,
		error: null,
	},
	reducers: {
		getArticlesStart: state => {
			state.loading = true
			state.error = null
		},
		getArticlesSuccess: (state, action) => {
			state.loading = false
			state.articles = action.payload
		},
		getArticlesFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export default articleSlice.reducer
export const { getArticlesStart, getArticlesSuccess, getArticlesFailure } =
	articleSlice.actions
