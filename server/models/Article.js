const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		image: String,
		category: String,
		reading_time: {
			type: String,
			default: '0 minutes',
		},
		content: { type: String, required: true },
		tags: [String],
	},
	{ timestamps: true }
)

// Pre-save hook to calculate reading time
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
