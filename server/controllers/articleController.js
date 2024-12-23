const Article = require('../models/Article')
const { articleSchema } = require('../validators/articleValidator')

// 📌 1. Barcha maqolalarni olish
exports.getArticles = async (req, res) => {
	try {
		const articles = await Article.find().sort({
			createdAt: -1,
		})
		res.json(articles)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// 📌 2. Bitta maqolani olish (ID bo‘yicha)
exports.getArticleById = async (req, res) => {
	try {
		const article = await Article.findById(req.params.id)
		if (!article) {
			return res.status(404).json({ error: 'Maqola topilmadi' })
		}
		res.json(article)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// 📌 3. Yangi maqola qo'shish
exports.createArticle = async (req, res) => {
	try {
		// Validatsiya qilish
		const { error } = articleSchema.validate(req.body)
		if (error) {
			return res.status(400).json({ error: error.details[0].message })
		}

		// Validatsiyadan o'tgan ma'lumotni saqlash
		const article = new Article(req.body)
		await article.save()
		res.status(201).json(article)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// 📌 4. Mavjud maqolani yangilash
exports.updateArticle = async (req, res) => {
	try {
		// Validatsiya qilish
		const { error } = articleSchema.validate(req.body)
		if (error) {
			return res.status(400).json({ error: error.details[0].message })
		}

		const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Yangilangan versiyani qaytaradi
			runValidators: true,
		})

		if (!article) {
			return res.status(404).json({ error: 'Maqola topilmadi' })
		}

		res.json(article)
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// 📌 5. Mavjud maqolani o'chirish
exports.deleteArticle = async (req, res) => {
	try {
		const article = await Article.findByIdAndDelete(req.params.id)
		if (!article) {
			return res.status(404).json({ error: 'Maqola topilmadi' })
		}
		res.json({ message: 'Maqola muvaffaqiyatli o‘chirildi' })
	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}
