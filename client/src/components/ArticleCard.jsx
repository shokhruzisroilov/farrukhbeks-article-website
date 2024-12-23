import { Link } from 'react-router-dom'

const ArticleCard = ({ id, title, image, content, createdAt, category }) => {
	// Matnni qisqartirish funksiyasi
	const truncateText = (text, wordLimit) => {
		const words = text.split(' ')
		if (words.length > wordLimit) {
			return words.slice(0, wordLimit).join(' ') + '...'
		}
		return text
	}

	// Sanani formatlash funksiyasi
	const formatDate = dateString => {
		if (!dateString) return 'Noma’lum sana'

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
		<Link to={`/articles/${id}`} className='p-5 shadow-lg rounded-lg bg-white'>
			<div>
				<img
					src={image}
					alt={title}
					className='w-full h-56 object-cover rounded-md'
				/>
			</div>
			<div className='flex justify-between items-center mt-2'>
				<p className='text-sm text-[#fc3c1a]'> {category}</p>
				<p className='text-sm text-gray-500'>{formatDate(createdAt)}</p>
			</div>
			<h3 className='mt-2 mb-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
				{truncateText(title, 5)}
			</h3>
			{/* HTML formatdagi contentni render qilish */}
			<p
				className='mb-2 text-gray-600 text-sm'
				dangerouslySetInnerHTML={{ __html: truncateText(content, 10) }}
			/>
		</Link>
	)
}

export default ArticleCard
