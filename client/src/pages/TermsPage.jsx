import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTerms } from '../store/slices/termSlice'
import { ErrorMessage, FullScreenLoader, TermCard } from '../components'

const TermsPage = () => {
	const dispatch = useDispatch()
	const { terms, loading, error } = useSelector(state => state.terms)

	useEffect(() => {
		dispatch(fetchTerms())
	}, [dispatch])

	// Agar yuklanayotgan bo'lsa, loader ko'rsatish
	if (loading) {
		return <FullScreenLoader />
	}

	// Agar xatolik yuz bersa, xatolik xabari ko'rsatish
	if (error) {
		return (
			<div className='min-h-screen flex justify-center items-center'>
				<ErrorMessage error={error} />
			</div>
		)
	}

	// Agar hech qanday term topilmasa
	if (!terms || terms.length === 0) {
		return (
			<div className='min-h-screen flex justify-center items-center'>
				<ErrorMessage error={'Hozirda shartlar mavjud emas.'} />
			</div>
		)
	}

	return (
		<div className='w-full min-h-screen mt-20'>
			<div className='px-4 py-4 max-w-7xl mx-auto'>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{/* Term kartalarini chiqarish */}
					{terms.map(term => (
						<TermCard
							key={term._id}
							id={term._id}
							title={term.title}
							image={term.image}
							description={term.description}
							createdAt={term.createdAt}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default TermsPage
