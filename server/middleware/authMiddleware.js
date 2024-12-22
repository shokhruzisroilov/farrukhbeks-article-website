const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (err) {
		res.status(401).json({ message: 'Invalid token' })
	}
}

const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next()
	} else {
		res.status(403).json({ message: 'Access denied. Admins only.' })
	}
}

module.exports = { protect, isAdmin }
