import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventDetails } from '../../store/slices/eventSlice'
import { useParams } from 'react-router-dom'
import { FullScreenLoader, ErrorMessage, ScrollToTop } from '../../components'
import DOMPurify from 'dompurify' // Optional: to sanitize HTML content

const DashboardEventDetails = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { event, loading, error } = useSelector(state => state.events)

	// Fetch event details
	useEffect(() => {
		dispatch(fetchEventDetails(id))
	}, [dispatch, id])

	// If loading, show loading spinner
	if (loading) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<FullScreenLoader />
			</div>
		)
	}

	// If there's an error, show error message
	if (error) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<ErrorMessage error={error} />
			</div>
		)
	}

	// If no event found, show error message
	if (!event) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='text-center text-gray-500 p-8 bg-white rounded-lg shadow-md'>
					<h2 className='text-2xl font-bold mb-2'>Tadbir topilmadi!</h2>
					<p>Iltimos, tadbir ID sini tekshirib ko'ring.</p>
				</div>
			</div>
		)
	}

	// Sanitize description if needed (optional, if you want to prevent XSS)
	const sanitizedDescription = DOMPurify.sanitize(event.description)

	// Render event details for the dashboard
	return (
		<div className='w-full min-h-screen  bg-gray-50'>
			<ScrollToTop />
			<div className='max-w-7xl mx-auto px-4 py-8'>
				<div className='md:col-span-3'>
					<h1 className='text-4xl font-extrabold text-gray-900 mb-6'>
						{event.title}
					</h1>

					{event.image && (
						<div className='w-full mb-6'>
							<img
								src={event.image}
								alt={event.title}
								className='w-full max-h-[400px] object-cover rounded-lg shadow-md'
							/>
						</div>
					)}

					<div className='prose prose-lg text-gray-800 leading-7'>
						<div className='flex justify-between items-center py-2'>
							<span className='bg-gray-200 px-3 py-1 rounded-md'>
								<strong>{event.location}</strong>
							</span>
							<p>
								<strong>Tadbir bo'lgan sana:</strong>{' '}
								{new Date(event.createdAt).toLocaleDateString()}
							</p>
						</div>
						<p className='my-1'>
							<strong>Ma'ruzachilar: </strong>
							{event.speakers}
						</p>
						<p>
							<strong>Temalar: </strong>
							{event.topics ? event.topics.join(', ') : 'No topics available'}
						</p>
						{/* Render sanitized HTML content for description */}
						<div
							className='my-4'
							dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DashboardEventDetails
