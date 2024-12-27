import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents } from '../store/slices/eventSlice'
import EventCard from '../components/EventCard'
import { ErrorMessage, FullScreenLoader } from '../components'

const Events = () => {
	const dispatch = useDispatch()
	const { events, loading, error } = useSelector(state => state.events)

	useEffect(() => {
		dispatch(fetchEvents())
	}, [dispatch])

	// If loading, show loading message
	if (loading) {
		return <FullScreenLoader />
	}

	// If there's an error, show error message
	if (error) {
		return (
			<div className='min-h-screen flex justify-center items-center'>
				<ErrorMessage error={error} />
			</div>
		)
	}

	// If there are no events, show no events available message
	if (!events || events.length === 0) {
		return (
			<div className='min-h-screen flex justify-center items-center'>
				<ErrorMessage error={'Hozirda tadbirlar mavjud emas.'} />
			</div>
		)
	}

	return (
		<div className='w-full min-h-screen mt-20'>
			<div className='px-4 py-4 max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{/* Display event cards */}
					{events.map(event => (
						<EventCard
							key={event._id}
							id={event._id}
							title={event.title}
							image={event.image}
							description={event.description}
							location={event.location}
							speakers={event.speakers}
							createdAt={event.createdAt}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Events
