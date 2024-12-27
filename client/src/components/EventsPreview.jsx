import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/slices/eventSlice'
import FullScreenLoader from './FullScreenLoader'

const EventsPreview = () => {
	const dispatch = useDispatch()
	const { events, loading, error } = useSelector(state => state.events)

	// Use fetchEvents async thunk instead of manual dispatch for loading events
	useEffect(() => {
		dispatch(fetchEvents()) // Dispatch the fetchEvents thunk to load events
	}, [dispatch])

	if (loading) {
		return <FullScreenLoader />
	}

	if (error) {
		return (
			<div className='text-center text-red-500 text-lg'>
				Tadbirlarni yuklashda xatolik: {error}
			</div>
		)
	}

	if (events.length === 0) {
		return (
			<div className='text-center text-gray-600 text-lg'>
				Hozircha tadbirlar mavjud emas.
			</div>
		)
	}

	// Show the last 3 events
	const lastThreeEvents = events.slice().reverse().slice(0, 3)

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{lastThreeEvents.map(event => (
				<div
					key={event._id}
					className='bg-white rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl'
				>
					<div className='h-40 bg-blue-600 flex items-center justify-center text-white text-lg font-semibold'>
						<img
							src={event.image || '/placeholder.jpg'}
							alt={event.title}
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='p-4'>
						<p className='text-gray-500 text-xs text-right'>
							{new Date(event.createdAt).toLocaleString()}{' '}
							{/* Assuming `date` is the event date */}
						</p>
						<h3 className='text-lg font-semibold text-gray-800'>
							{event.title.length > 40
								? `${event.title.substring(0, 40)}...`
								: event.title}
						</h3>
						<p className='text-sm text-gray-600 mt-2'>
							{event.description.length > 100
								? `${event.description.substring(0, 100)}...`
								: event.description}
						</p>
						<Link
							to={`/events/${event._id}`}
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

export default EventsPreview
