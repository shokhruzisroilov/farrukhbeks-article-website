import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTerms } from '../store/slices/termSlice'
import FullScreenLoader from './FullScreenLoader'

const TermsPreview = () => {
	const dispatch = useDispatch()
	const { terms, loading, error } = useSelector(state => state.terms)

	// Dispatch the fetchTerms async thunk to load terms data
	useEffect(() => {
		dispatch(fetchTerms())
	}, [dispatch])

	if (loading) {
		return <FullScreenLoader />
	}

	if (error) {
		return (
			<div className='text-center text-red-500 text-lg'>
				Atamalarni yuklashda xatolik: {error}
			</div>
		)
	}

	if (terms.length === 0) {
		return (
			<div className='text-center text-gray-600 text-lg'>
				Hozircha atamalar mavjud emas.
			</div>
		)
	}

	// Show the last 3 terms
	const lastThreeTerms = terms.slice().reverse().slice(0, 3)

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{lastThreeTerms.map(term => (
				<div
					key={term._id}
					className='bg-white rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl'
				>
					<div className='h-40 bg-blue-600 flex items-center justify-center text-white text-lg font-semibold'>
						<img
							src={term.image || '/placeholder.jpg'}
							alt={term.title}
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='p-4'>
						<p className='text-gray-500 text-xs text-right'>
							{new Date(term.createdAt).toLocaleString()}{' '}
							{/* Assuming `createdAt` is the term creation date */}
						</p>
						<h3 className='text-lg font-semibold text-gray-800'>
							{term.title.length > 40
								? `${term.title.substring(0, 40)}...`
								: term.title}
						</h3>
						<p className='text-sm text-gray-600 mt-2'>
							{term.description.length > 100 ? (
								<span
									dangerouslySetInnerHTML={{
										__html: term.description.substring(0, 100),
									}}
								/>
							) : (
								<span dangerouslySetInnerHTML={{ __html: term.description }} />
							)}
						</p>
						<Link
							to={`/terms/${term._id}`}
							className='text-orange-500 font-medium hover:underline mt-4 block'
						>
							Batafsil o'qish
						</Link>
					</div>
				</div>
			))}
		</div>
	)
}

export default TermsPreview
