import { Link } from 'react-router-dom'

const DashboardArticleCard = ({ article, onDeleteClick, onEditClick }) => {
	// Function to format the published date and time
	const formatDate = dateString => {
		const date = new Date(dateString)
		// Formatting the date with time (hours:minutes AM/PM format)
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true,
		})
	}

	return (
		<div className='p-5 shadow-lg rounded-lg bg-white'>
			<Link to={`/admin/articles/${article._id}`} className='block'>
				<div>
					{/* Displaying the article image */}
					<img
						src={article.image}
						alt={article.title}
						className='w-full h-56 object-cover rounded-md'
					/>
				</div>
				<div className='flex justify-between items-center mt-2'>
					{/* Displaying the category */}
					<p className='text-sm text-[#fc3c1a]'>{article.category}</p>
					{/* Displaying the formatted published date with time */}
					<p className='text-sm text-gray-500'>
						{formatDate(article.createdAt)}
					</p>
				</div>
				<h3 className='mt-2 mb-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors'>
					{article.title}
				</h3>
				{/* Rendering content as HTML */}
				<p
					className='mb-2 text-gray-600 text-sm'
					dangerouslySetInnerHTML={{
						__html: article.content.slice(0, 100) + '...',
					}}
				></p>
			</Link>

			<div className='flex justify-between items-center mt-3'>
				<button
					onClick={() => onEditClick(article._id)}
					className='bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md'
				>
					✏️ Tahrirlash
				</button>
				<button
					onClick={() => onDeleteClick(article._id)}
					className='bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md'
				>
					🗑️ O'chirish
				</button>
			</div>
		</div>
	)
}

export default DashboardArticleCard
