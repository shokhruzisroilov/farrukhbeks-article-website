import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTerms, deleteTerm } from '../../store/slices/termSlice'
import { Link } from 'react-router-dom'
import { ErrorMessage, FullScreenLoader } from '../../components'
import { DashboardTermCard } from '../../components/admin'

const DashboardTerms = () => {
	const dispatch = useDispatch()
	const { terms, loading, error } = useSelector(state => state.terms)

	useEffect(() => {
		dispatch(fetchTerms())
	}, [dispatch])

	const handleDelete = id => {
		if (
			window.confirm(
				'Termni o‘chirishni xohlayotganingizga ishonchingiz komilmi?'
			)
		) {
			dispatch(deleteTerm(id))
				.then(() => {
					alert('Term muvaffaqiyatli o‘chirildi')
					dispatch(fetchTerms())
				})
				.catch(err => {
					console.error(err)
					alert('Termni o‘chirishda xato yuz berdi')
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
					Barcha atamalar
				</h1>

				{/* Yangi term qo‘shish tugmasi */}
				<Link
					to='/admin/terms/create'
					className='text-white bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out mb-6 inline-block'
				>
					Yangi atama qo‘shish
				</Link>
			</div>

			{/* Terms ro‘yxati */}
			{!terms || terms.length === 0 ? (
				<div className='text-gray-500'>Hozircha terms mavjud emas</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
					{terms.map(term => (
						<DashboardTermCard
							key={term._id}
							term={term}
							onDelete={handleDelete}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default DashboardTerms
