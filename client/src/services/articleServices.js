import api from './api'

const ArticleServices = {
	// Barcha maqolalarni olish
	async getArticles() {
		const response = await api.get('/articles')
		return response.data
	},

	// Bitta maqolani olish
	async getArticleById(id) {
		const response = await api.get(`/articles/${id}`)
		return response.data
	},

	// Yangi maqola qo'shish
	async createArticle(articleData) {
		const response = await api.post('/articles/create', articleData)
		return response.data
	},

	// Maqolani yangilash
	async updateArticle(id, articleData) {
		const response = await api.put(`/articles/update/${id}`, articleData)
		return response.data
	},

	// Maqolani o'chirish
	async deleteArticle(id) {
		const response = await api.delete(`/articles/delete/${id}`)
		return response.data
	},
}

export default ArticleServices
