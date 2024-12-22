const Joi = require('joi')

// Maqola validatsiyasi
const articleSchema = Joi.object({
	title: Joi.string().min(3).max(300).required(),
	image: Joi.string().uri().required(),
	category: Joi.string().required(),
	author: Joi.string().required(),
	authorPic: Joi.string().required(),
	published_date: Joi.string().required(),
	reading_time: Joi.string().required(),
	content: Joi.string().min(10).required(),
	tags: Joi.array().items(Joi.string()).required(),
})

module.exports = { articleSchema }
