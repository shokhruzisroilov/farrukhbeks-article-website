// services/articleService.js

import api from './api'

// Barcha maqolalarni olish
export const getArticles = async () => {
	try {
		const response = await api.get('/articles')
		return response.data
	} catch (error) {
		console.error('Maqolalarni olishda xato:', error)
		throw error
	}
}

// Bitta maqolani olish
export const getArticleById = async id => {
	try {
		const response = await api.get(`/articles/${id}`)
		return response.data
	} catch (error) {
		console.error('Maqolani olishda xato:', error)
		throw error
	}
}

// Yangi maqola qo'shish
export const createArticle = async articleData => {
	try {
		const response = await api.post('/articles/create', articleData)
		return response.data
	} catch (error) {
		console.error('Maqolani yaratishda xato:', error)
		throw error
	}
}

// Maqolani yangilash
export const updateArticle = async (id, articleData) => {
	try {
		const response = await api.put(`/articles/update/${id}`, articleData)
		return response.data
	} catch (error) {
		console.error('Maqolani yangilashda xato:', error)
		throw error
	}
}

// Maqolani o'chirish
export const deleteArticle = async id => {
	try {
		const response = await api.delete(`/articles/delete/${id}`)
		return response.data
	} catch (error) {
		console.error("Maqolani o'chirishda xato:", error)
		throw error
	}
}
