const mongoose = require('mongoose')

// Maqola sxemasi
const articleSchema = new mongoose.Schema({
	title: { type: String, required: true },
	image: String,
	category: String,
	published_date: {
		type: Date,
		default: Date.now,
	},
	reading_time: {
		type: String,
		default: '0 minutes',
	},
	content: { type: String, required: true },
	tags: [String],
})

articleSchema.pre('save', function (next) {
	if (this.content) {
		const wordCount = this.content.split(' ').length
		const readingTime = Math.ceil(wordCount / 200)
		this.reading_time = `${readingTime} minut`
	}
	next()
})

// Modelni eksport qilish
module.exports = mongoose.model('Article', articleSchema)
