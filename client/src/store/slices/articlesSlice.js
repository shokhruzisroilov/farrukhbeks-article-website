import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	articles: [],
	loading: false,
	error: null,
}

const articlesSlice = createSlice({
	name: 'articles',
	initialState,
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
		getArticleStart: state => {
			state.loading = true
			state.error = null
		},
		getArticleSuccess: (state, action) => {
			state.loading = false
			state.articles = [action.payload] // Faqat bitta maqola
		},
		getArticleFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		createArticleStart: state => {
			state.loading = true
			state.error = null
		},
		createArticleSuccess: (state, action) => {
			state.loading = false
			state.articles.push(action.payload)
		},
		createArticleFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		updateArticleStart: state => {
			state.loading = true
			state.error = null
		},
		updateArticleSuccess: (state, action) => {
			state.loading = false
			const updatedArticle = action.payload
			state.articles = state.articles.map(article =>
				article._id === updatedArticle._id ? updatedArticle : article
			)
		},
		updateArticleFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
		deleteArticleStart: state => {
			state.loading = true
		},
		deleteArticleSuccess: (state, action) => {
			state.loading = false
			// Fix: Delete article from state
			state.articles = state.articles.filter(
				article => article._id !== action.payload
			)
		},
		deleteArticleFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
	createArticleStart,
	createArticleSuccess,
	createArticleFailure,
	updateArticleStart,
	updateArticleSuccess,
	updateArticleFailure,
	deleteArticleStart,
	deleteArticleSuccess,
	deleteArticleFailure,
} = articlesSlice.actions

export default articlesSlice.reducer
