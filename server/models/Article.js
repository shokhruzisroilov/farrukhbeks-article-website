const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
	title: String,
	image: String,
	category: String,
	author: String,
	authorPic: String,
	published_date: String,
	reading_time: String,
	content: String,
	tags: [String],
})

module.exports = mongoose.model('Article', articleSchema)
