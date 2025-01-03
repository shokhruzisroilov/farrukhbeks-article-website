const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
require('dotenv').config()
const app = express()

const allowedOrigins = [
	// 'http://localhost:5173',
	'https://www.investiq.uz',
	'https://farrukhbek-article-website.vercel.app',
]
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true)
			} else {
				callback(new Error('❌ Not allowed by CORS'))
			}
		},
		credentials: true,
	})
)

app.use(express.json())

connectDB()

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/articles', require('./routes/articles'))
app.use('/api/events', require('./routes/eventRoutes'))
app.use('/api/terms', require('./routes/termRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
