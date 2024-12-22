import { Link } from 'react-router-dom'

const ArticleCard = ({ title, image, content, published_date, category }) => {
	const truncateText = (text, wordLimit) => {
		const words = text.split(' ')
		if (words.length > wordLimit) {
			return words.slice(0, wordLimit).join(' ') + '...'
		}
		return text
	}

	const formatDate = dateString => {
		const date = new Date(dateString)
		const options = {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		}
		const formattedDate = date.toLocaleString('uz-UZ', options)
		return formattedDate.replace(',', '').replace('/', '-')
	}

	return (
		<Link
			to={`/articles/${title}`}
			className='p-5 shadow-lg rounded-lg bg-white'
		>
			<div>
				<img
					src={image}
					alt={title}
					className='w-full h-56 object-cover rounded-md'
				/>
			</div>
			<div className='flex justify-between items-center mt-2'>
				<p className='text-sm text-[#fc3c1a]'> {category}</p>
				<p className='text-sm text-gray-500'>{formatDate(published_date)}</p>
			</div>
			<h3 className='mt-2 mb-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
				{truncateText(title, 5)}
			</h3>
			<p className='mb-2 text-gray-600 text-sm'>{truncateText(content, 10)}</p>
		</Link>
	)
}

export default ArticleCard
