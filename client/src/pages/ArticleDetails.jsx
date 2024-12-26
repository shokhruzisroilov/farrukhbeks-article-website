import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ArticleServices from '../services/articleServices'
import {
	FullScreenLoader,
	ErrorMessage,
	ScrollToTop,
	Sidebar,
} from '../components'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../store/slices/articlesSlice'

const ArticleDetails = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { articles, loading, error } = useSelector(state => state.articles)

	// Maqolalarni olish
	useEffect(() => {
		const fetchArticles = async () => {
			dispatch(getArticlesStart())
			try {
				const allArticles = await ArticleServices.getArticles() // Barcha maqolalarni olish
				dispatch(getArticlesSuccess(allArticles)) // Maqolalarni store'ga qo'shish
			} catch (err) {
				dispatch(getArticlesFailure(err.message || 'Maqolalar yuklanmadi'))
			}
		}

		if (articles.length === 0) {
			fetchArticles() // Agar maqolalar mavjud bo'lmasa, fetch qilish
		}
	}, [dispatch, articles])

	// Yuklanish holati
	if (loading) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<FullScreenLoader />
			</div>
		)
	}

	// Xatolik holati
	if (error) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<ErrorMessage error={error} />
			</div>
		)
	}

	// Maqolani ID orqali topish
	const article = articles.find(article => article._id === id)

	// Agar maqola topilmasa
	if (!article) {
		return (
			<div className='w-full min-h-screen flex items-center justify-center bg-gray-50'>
				<div className='text-center text-gray-500 p-8 bg-white rounded-lg shadow-md'>
					<h2 className='text-2xl font-bold mb-2'>Maqola topilmadi!</h2>
					<p>Iltimos maqola ID sini tekshiring.</p>
				</div>
			</div>
		)
	}

	// Maqola detallari
	return (
		<div className='w-full min-h-screen mt-20 bg-gray-50'>
			<ScrollToTop />
			<div className='max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-12'>
				{/* Asosiy maqola */}
				<div className='md:col-span-3'>
					<h1 className='text-4xl font-extrabold text-gray-900 mb-6'>
						{article.title}
					</h1>
					<div className='flex justify-between items-center text-sm text-gray-500 mb-4'>
						<span className='bg-gray-200 px-3 py-1 rounded-md'>
							<strong>{article.category}</strong>
						</span>
						<span>
							<strong>Yaratilgan sana:</strong>{' '}
							{new Date(article.createdAt).toLocaleDateString()}
						</span>
					</div>
					{article.image && (
						<div className='w-full mb-6'>
							<img
								src={article.image}
								alt={article.title}
								className='w-full max-h-[400px] object-cover rounded-lg shadow-md'
							/>
						</div>
					)}
					<div
						className='prose prose-lg text-gray-800 leading-7'
						dangerouslySetInnerHTML={{ __html: article.content }}
					></div>
				</div>

				{/* So'nggi maqolalar sidebar */}
				<Sidebar />
			</div>
		</div>
	)
}

export default ArticleDetails
