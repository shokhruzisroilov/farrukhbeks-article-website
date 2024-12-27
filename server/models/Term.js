const mongoose = require('mongoose')

const termSchema = new mongoose.Schema(
	{
		image: {
			type: String,
			required: true, // Tasvir URL'si majburiy
		},
		title: {
			type: String,
			required: true, // Sarlavha majburiy
			trim: true, // Bo'sh joylarni olib tashlash
		},
		description: {
			type: String,
			required: true, // Tavsif majburiy
		},
	},
	{ timestamps: true }
) // Yaratilgan va yangilangan vaqtni avtomatik qo'shish

module.exports = mongoose.model('Term', termSchema)
