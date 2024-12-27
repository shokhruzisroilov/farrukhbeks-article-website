import { Link } from 'react-router-dom'

const TermCard = ({ id, title, description, createdAt, image }) => {
	// Matnni qisqartirish funksiyasi
	const truncateText = (text, wordLimit) => {
		if (!text) return 'No description available'
		const words = text.split(' ')
		if (words.length > wordLimit) {
			return words.slice(0, wordLimit).join(' ') + '...'
		}
		return text
	}

	// Sanani formatlash funksiyasi
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
		<Link
			to={`/terms/${id}`}
			className='p-5 shadow-lg rounded-lg bg-white  transition-shadow'
		>
			{/* Rasm */}
			{image && (
				<img
					src={image}
					alt={title}
					className='w-full h-40 object-cover rounded-md mb-2'
				/>
			)}

			{/* Sarlavha va Sana */}
			<p className='text-sm text-gray-500 text-right mb-2'>
				{formatDate(createdAt)}
			</p>
			<div className='flex justify-between items-center mb-2'>
				<h3 className='text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
					{truncateText(title, 5)}
				</h3>
			</div>

			{/* Tavsif */}
			<p
				className='text-gray-600 text-sm mb-2'
				dangerouslySetInnerHTML={{ __html: truncateText(description, 15) }}
			/>
		</Link>
	)
}

export default TermCard
