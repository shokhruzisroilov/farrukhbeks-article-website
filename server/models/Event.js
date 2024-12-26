const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		location: { type: String, required: true },
		topics: { type: [String], required: true },
		speakers: { type: String, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Event', EventSchema)
