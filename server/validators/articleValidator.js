const Joi = require('joi')

// Maqola validatsiyasi
const articleSchema = Joi.object({
	title: Joi.string().min(3).max(300).required().messages({
		'string.base': "Title matn bo'lishi kerak",
		'string.min': "Title kamida 3 ta belgidan iborat bo'lishi kerak",
		'string.max': "Title ko'pi bilan 300 ta belgidan iborat bo'lishi kerak",
		'any.required': 'Title maydoni talab qilinadi',
	}),
	image: Joi.string().uri().required().messages({
		'string.uri': "Image maydonida to'g'ri URL bo'lishi kerak",
		'any.required': 'Image maydoni talab qilinadi',
	}),
	category: Joi.string().required().messages({
		'any.required': 'Category maydoni talab qilinadi',
	}),
	content: Joi.string().min(10).required().messages({
		'string.min': "Content kamida 10 ta belgidan iborat bo'lishi kerak",
		'any.required': 'Content maydoni talab qilinadi',
	}),
	tags: Joi.array().items(Joi.string()).messages({
		'array.base': "Tags massiv bo'lishi kerak",
		'string.base': "Har bir tag matn bo'lishi kerak",
	}),
})

module.exports = { articleSchema }
