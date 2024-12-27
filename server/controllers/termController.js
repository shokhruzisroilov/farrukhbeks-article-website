const Term = require('../models/Term')

// Yangi Term qo'shish
const createTerm = async (req, res) => {
	try {
		const { image, title, description } = req.body

		const newTerm = new Term({ image, title, description })
		const savedTerm = await newTerm.save()
		res.status(201).json(savedTerm)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Barcha Termlarni olish
const getAllTerms = async (req, res) => {
	try {
		const terms = await Term.find().sort({ createdAt: -1 })
		res.status(200).json(terms)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Termni ID bo'yicha olish
const getTermById = async (req, res) => {
	try {
		const term = await Term.findById(req.params.id)
		if (!term) return res.status(404).json({ message: 'Term not found' })
		res.status(200).json(term)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Termni yangilash
const updateTerm = async (req, res) => {
	try {
		const updatedTerm = await Term.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!updatedTerm) return res.status(404).json({ message: 'Term not found' })
		res.status(200).json(updatedTerm)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Termni o'chirish
const deleteTerm = async (req, res) => {
	try {
		const deletedTerm = await Term.findByIdAndDelete(req.params.id)
		if (!deletedTerm) return res.status(404).json({ message: 'Term not found' })
		res.status(200).json({ message: 'Term deleted successfully' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	createTerm,
	getAllTerms,
	getTermById,
	updateTerm,
	deleteTerm,
}
