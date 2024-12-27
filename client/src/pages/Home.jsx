import React from 'react'
import {
	ArticlesPreview,
	Banner,
	EventsPreview,
	TermsPreview,
} from '../components'

const Home = () => {
	return (
		<div className='w-full min-h-screen'>
			{/* Banner bo'limi */}
			<Banner />

			<div className='px-4 py-4 max-w-7xl mx-auto'>
				{/* Maqolalar bo'limi */}
				<section className='container mx-auto mt-10 px-4'>
					<h2 className='text-2xl font-bold mb-4 text-gray-800'>
						So'ngi Iqtisodiyot Maqolalari
					</h2>
					<hr className='w-16 border-2 border-red-500 mb-6' />
					<ArticlesPreview />
				</section>

				{/* Tadbirlar bo'limi */}
				<section className='container mx-auto mt-10 px-4'>
					<h2 className='text-2xl font-bold mb-4 text-gray-800'>
						Yaqinda Bo'lgan Tadbirlar
					</h2>
					<hr className='w-16 border-2 border-red-500 mb-6' />
					<EventsPreview />
				</section>

				{/* Atamalar bo'limi */}
				<section className='container mx-auto mt-10 px-4'>
					<h2 className='text-2xl font-bold mb-4 text-gray-800'>
						So'ngi Atamalar
					</h2>
					<hr className='w-16 border-2 border-red-500 mb-6' />
					<TermsPreview />
				</section>
			</div>
		</div>
	)
}

export default Home
