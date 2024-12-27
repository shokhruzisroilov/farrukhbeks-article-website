import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTermDetails } from '../store/slices/termSlice'
import { FullScreenLoader, ErrorMessage, ScrollToTop } from '../components'
import DOMPurify from 'dompurify' // Optional: to sanitize HTML content

const TermDetails = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { term, loading, error } = useSelector(state => state.terms)

	// Term ma'lumotlarini olish
	useEffect(() => {
		dispatch(fetchTermDetails(id))
	}, [dispatch, id])

	// Agar yuklanayotgan bo'lsa, loading spinnerni ko'rsatish
	if (loading) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<FullScreenLoader />
			</div>
		)
	}

	// Xatolik bo'lsa, xatolikni ko'rsatish
	if (error) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<ErrorMessage error={error} />
			</div>
		)
	}

	// Agar term topilmasa, xatolikni ko'rsatish
	if (!term) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='text-center text-gray-500 p-8 bg-white rounded-lg shadow-md'>
					<h2 className='text-2xl font-bold mb-2'>Term topilmadi!</h2>
					<p>Iltimos, term ID sini tekshirib ko'ring.</p>
				</div>
			</div>
		)
	}

	// Sanitize description if needed (optional, if you want to prevent XSS)
	const sanitizedDescription = DOMPurify.sanitize(term.description)

	// Term ma'lumotlarini yangilangan dizayn bilan ko'rsatish
	return (
		<div className='w-full min-h-screen mt-20 bg-gray-50'>
			<ScrollToTop />
			<div className='max-w-7xl mx-auto px-4 py-8'>
				{/* Asosiy Term Ma'lumotlari */}
				<div className='md:col-span-3'>
					<h1 className='text-4xl font-extrabold text-gray-900 mb-6'>
						{term.title}
					</h1>

					{term.image && (
						<div className='w-full mb-6'>
							<img
								src={term.image}
								alt={term.title}
								className='w-full max-h-[400px] object-cover rounded-lg shadow-md'
							/>
						</div>
					)}
					<div className='prose prose-lg text-gray-800 leading-7'>
						<div className='flex justify-between items-center py-2'>
							<p>
								<strong>Yaratildi:</strong>
								{new Date(term.createdAt).toLocaleDateString()}
							</p>
						</div>
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

export default TermDetails
