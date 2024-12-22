import { useState } from 'react'

const CategorySelection = ({ categories, onCategoryChange }) => {
	const [selectedCategory, setSelectedCategory] = useState('Barchasi')

	// Handle category change
	const handleCategoryChange = e => {
		const category = e.target.value
		setSelectedCategory(category)
		onCategoryChange(category)
	}

	return (
		<div className='px-4 mb-8 lg:space-x-16 space-x-4 flex flex-wrap items-center justify-center border-b-2 py-5 text-gray-900 font-semibold'>
			{/* Category buttons */}
			{categories.map(category => (
				<button
					key={category}
					value={category}
					onClick={handleCategoryChange}
					className={`mr-2 space-x-16 ${
						selectedCategory === category ? 'text-[#fc3c1a]' : ''
					}`}
				>
					{category}
				</button>
			))}
		</div>
	)
}

export default CategorySelection
