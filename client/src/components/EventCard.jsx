import { Link } from 'react-router-dom'

const EventCard = ({
	id,
	title,
	image,
	description,
	location,
	speakers,
	createdAt,
}) => {
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
		if (!dateString) return 'N/A'

		const date = new Date(dateString)
		if (isNaN(date)) return 'Invalid Date Format'

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
		<Link to={`/events/${id}`} className='p-5 shadow-lg rounded-lg bg-white'>
			<div>
				<img
					src={image}
					alt={title}
					className='w-full h-56 object-cover rounded-md'
				/>
			</div>
			<div className='flex justify-between items-center mt-2'>
				<p className='text-sm text-[#fc3c1a]'>{location}</p>
				<p className='text-sm text-gray-500'>{formatDate(createdAt)}</p>
			</div>
			<h3 className='mt-2 mb-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
				{truncateText(title, 5)}
			</h3>
			<p
				className='mb-2 text-gray-600 text-sm'
				dangerouslySetInnerHTML={{ __html: truncateText(description, 10) }}
			/>
			<p className='text-sm text-gray-500'>
				Speakers: {truncateText(speakers, 5)}
			</p>
		</Link>
	)
}

export default EventCard
