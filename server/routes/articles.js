const express = require('express')
const router = express.Router()
const {
	getArticles,
	getArticleById,
	createArticle,
	updateArticle,
	deleteArticle,
} = require('../controllers/articleController')
const { articleSchema } = require('../validators/articleValidator')

// Validatsiya middleware
const validateArticle = (req, res, next) => {
	const { error } = articleSchema.validate(req.body)
	if (error) {
		return res.status(400).json({ error: error.details[0].message })
	}
	next()
}

// CRUD yo'llari
router.get('/articles', getArticles) // Barcha maqolalar
router.get('/articles/:id', getArticleById) // Bitta maqola
router.post('/articles/create', validateArticle, createArticle) // Yangi maqola
router.put('/articles/update/:id', validateArticle, updateArticle) // Maqolani yangilash
router.delete('/articles/delete/:id', deleteArticle) // Maqolani o‘chirish

module.exports = router
