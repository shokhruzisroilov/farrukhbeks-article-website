import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'

const DashboardEventCard = ({ event, onDelete }) => {
	const sanitizedDescription = DOMPurify.sanitize(event.description)
	// Content cut function
	const truncateText = (text, wordLimit) => {
		const words = text.split(' ')
		if (words.length > wordLimit) {
			return words.slice(0, wordLimit).join(' ') + '...'
		}
		return text
	}

	// Date format
	const formatDate = dateString => {
		if (!dateString) return 'Ma’lumot mavjud emas'

		const date = new Date(dateString)
		if (isNaN(date)) return 'Noto‘g‘ri sana formati'

		return date.toLocaleString('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})
	}

	return (
		<div className='bg-white shadow-lg rounded-lg p-4 border border-gray-300 hover:shadow-2xl transition-all duration-300 ease-in-out'>
			<Link to={`/admin/events/${event._id}`}>
				{/* Image */}
				<div className='mb-4'>
					<img
						src={event.image}
						alt={event.title}
						className='w-full h-56 object-cover rounded-md'
					/>
				</div>

				<div className='flex justify-between items-center mb-2'>
					{/* Location */}
					<div className='text-sm text-gray-500'>
						<strong>{event.location}</strong>
					</div>
					{/* Date */}
					<div className='text-sm text-gray-500'>
						{formatDate(event.createdAt)}
					</div>
				</div>

				<div className='mb-4'>
					{/* Title */}
					<h2 className='text-2xl font-semibold text-orange-600 hover:text-orange-500 transition-colors mb-2'>
						{truncateText(event.title, 5)}
					</h2>
					{/* Description */}
					<p
						className='text-gray-700 text-sm md:text-base mb-4'
						dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
					></p>
				</div>
			</Link>

			<div className='flex gap-4 mt-4 justify-between'>
				<Link
					to={`/admin/events/${event._id}/edit`}
					className='text-white bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
				>
					Tahrirlash
				</Link>
				<button
					onClick={() => onDelete(event._id)}
					className='text-white bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
				>
					O‘chirish
				</button>
			</div>
		</div>
	)
}

export default DashboardEventCard
