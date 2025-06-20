const User = require('../models/User')

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('❌ Server Error')
	}
}

module.exports = { getAllUsers }
