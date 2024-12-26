import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEvents, deleteEvent } from '../../store/slices/eventSlice'
import { DashboardEventCard } from '../../components/admin'
import { Link } from 'react-router-dom'
import { ErrorMessage, FullScreenLoader } from '../../components'

const DashboardEvents = () => {
	const dispatch = useDispatch()
	const { events, loading, error } = useSelector(state => state.events)

	useEffect(() => {
		dispatch(fetchEvents())
	}, [dispatch])

	const handleDelete = id => {
		if (
			window.confirm(
				'Tadbirni o‘chirishni xohlayotganingizga ishonchingiz komilmi?'
			)
		) {
			dispatch(deleteEvent(id))
				.then(() => {
					alert('Tadbir muvaffaqiyatli o‘chirildi')
					dispatch(fetchEvents())
				})
				.catch(err => {
					console.error(err)
					alert('Tadbirni o‘chirishda xato yuz berdi')
				})
		}
	}

	if (loading) {
		return <FullScreenLoader />
	}

	if (error) {
		return <ErrorMessage error={error} />
	}

	return (
		<div className='w-full p-6 min-h-screen'>
			<div className='flex justify-between'>
				<h1 className='text-3xl font-bold text-orange-600 mb-6'>
					Barcha Tadbirlar
				</h1>

				{/* Yangi tadbir qo‘shish tugmasi */}
				<Link
					to='/admin/events/create'
					className='text-white bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out mb-6 inline-block'
				>
					Yangi Tadbir Qo‘shish
				</Link>
			</div>

			{/* Tadbirlar ro‘yxati */}
			{!events || events.length === 0 ? (
				<div className='text-gray-500'>Hozircha tadbirlar mavjud emas</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{events.map(event => (
						<DashboardEventCard
							key={event._id}
							event={event}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default DashboardEvents
