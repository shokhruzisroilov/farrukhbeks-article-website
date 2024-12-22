const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const registerSchema = require('../validators/registerValidation')

// Register funksiyasi
const register = async (req, res) => {
	try {
		// Validatsiya
		const { error } = registerSchema.validate(req.body, { abortEarly: false })
		if (error) {
			return res.status(400).json({
				message: error.details.map(err => err.message),
			})
		}

		const { username, email, password } = req.body

		// Foydalanuvchini tekshirish
		const existingUser = await User.findOne({ $or: [{ email }, { username }] })
		if (existingUser) {
			return res.status(400).json({
				message: `Bu ${
					existingUser.email === email ? 'email' : 'username'
				} allaqachon ro'yxatdan o'tgan`,
			})
		}

		// Parolni hash qilish
		const hashedPassword = await bcrypt.hash(password, 10)

		// Yangi foydalanuvchini yaratish
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		})

		await newUser.save()

		res
			.status(201)
			.json({ message: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi" })
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Serverda xato yuz berdi', error: err.message })
	}
}

const login = async (req, res) => {
	try {
		// Foydalanuvchini email orqali topish
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({ message: 'Email yoki parol xato' })
		}

		// Parolni tekshirish
		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(400).json({ message: 'Email yoki parol xato' })
		}

		// JWT token yaratish (foydalanuvchi ma'lumotlarini qo'shish)
		const token = jwt.sign(
			{ id: user._id, isAdmin: user.isAdmin, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' }
		)

		res.status(200).json({
			message: 'Muvaffaqiyatli kirildi',
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				name: user.name,
				isAdmin: user.isAdmin,
			},
		})
	} catch (err) {
		res
			.status(500)
			.json({ message: 'Serverda xato yuz berdi', error: err.message })
	}
}

module.exports = { register, login }
