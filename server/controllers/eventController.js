const Event = require('../models/Event')

// Get all events
const getEvents = async (req, res) => {
	try {
		const events = await Event.find().sort({ createdAt: -1 })
		res.status(200).json(events)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single event by ID
const getEventById = async (req, res) => {
	try {
		const event = await Event.findById(req.params.id)
		if (!event) return res.status(404).json({ message: 'Event not found' })
		res.status(200).json(event)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new event
const createEvent = async (req, res) => {
	const { title, description, location, topics, speakers, image } = req.body
	try {
		const newEvent = new Event({
			title,
			description,
			location,
			topics,
			speakers,
			image,
		})
		const savedEvent = await newEvent.save()
		res.status(201).json(savedEvent)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Update event by ID
const updateEvent = async (req, res) => {
	try {
		const updatedEvent = await Event.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		)
		if (!updatedEvent)
			return res.status(404).json({ message: 'Event not found' })
		res.status(200).json(updatedEvent)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Delete event by ID
const deleteEvent = async (req, res) => {
	try {
		const deletedEvent = await Event.findByIdAndDelete(req.params.id)
		if (!deletedEvent)
			return res.status(404).json({ message: 'Event not found' })
		res.status(200).json({ message: 'Event deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getEvents,
	getEventById,
	createEvent,
	updateEvent,
	deleteEvent,
}
