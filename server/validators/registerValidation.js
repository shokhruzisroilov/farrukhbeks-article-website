const Joi = require('joi')

const registerSchema = Joi.object({
	username: Joi.string().min(3).max(30).required().messages({
		'string.base': "Foydalanuvchi ismi matn bo'lishi kerak.",
		'string.min':
			"Foydalanuvchi ismi kamida 3 ta belgidan iborat bo'lishi kerak.",
		'string.max': 'Foydalanuvchi ismi 30 ta belgidan oshmasligi kerak.',
		'any.required': 'Foydalanuvchi ismi majburiy.',
	}),
	email: Joi.string().email().required().messages({
		'string.email': "To'g'ri email manzil kiriting.",
		'any.required': 'Email majburiy.',
	}),
	password: Joi.string().min(6).required().messages({
		'string.min': "Parol kamida 6 ta belgidan iborat bo'lishi kerak.",
		'any.required': 'Parol majburiy.',
	}),
	confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
		'any.only': 'Parollar mos kelmayapti.',
		'any.required': 'Parolni tasdiqlash majburiy.',
	}),
})

module.exports = registerSchema
