const express = require('express')
const router = express.Router()
const {
	createTerm,
	getAllTerms,
	getTermById,
	updateTerm,
	deleteTerm,
} = require('../controllers/termController')

// POST - Yangi term qo'shish
router.post('/create', createTerm)

// GET - Barcha termlarni olish
router.get('/', getAllTerms)

// GET - ID bo'yicha termni olish
router.get('/:id', getTermById)

// PUT - ID bo'yicha termni yangilash
router.put('/update/:id', updateTerm)

// DELETE - ID bo'yicha termni o'chirish
router.delete('/delete/:id', deleteTerm)

module.exports = router
