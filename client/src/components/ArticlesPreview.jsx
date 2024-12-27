import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../store/slices/articlesSlice'
import ArticleServices from '../services/articleServices'
import FullScreenLoader from './FullScreenLoader'

const ArticlesPreview = () => {
	const dispatch = useDispatch()
	const { articles, loading, error } = useSelector(state => state.articles)

	useEffect(() => {
		const fetchArticles = async () => {
			dispatch(getArticlesStart())
			try {
				const response = await ArticleServices.getArticles()
				dispatch(getArticlesSuccess(response))
			} catch (err) {
				dispatch(getArticlesFailure(err.message))
			}
		}

		fetchArticles()
	}, [dispatch])

	if (loading) {
		return <FullScreenLoader />
	}

	if (error) {
		return (
			<div className='text-center text-red-500 text-lg'>
				Maqolalarni yuklashda xatolik: {error}
			</div>
		)
	}

	if (articles.length === 0) {
		return (
			<div className='text-center text-gray-600 text-lg'>
				Hozircha maqolalar mavjud emas.
			</div>
		)
	}

	// Show the last 3 events
	const lastThreeActicles = articles.slice().reverse().slice(0, 3)

	return (
		<div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
			{lastThreeActicles.map(article => (
				<div
					key={article._id}
					className='bg-white rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl'
				>
					<div className='h-40 bg-blue-600 flex items-center justify-center text-white text-lg font-semibold'>
						<img
							src={article.image || '/placeholder.jpg'}
							alt={article.title}
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='p-4'>
						<div className='flex justify-between items-center'>
							<span className='text-red-500 text-xs font-semibold'>
								{article.category || 'Kategoriya'}
							</span>
							<span className='text-gray-500 text-xs'>
								{new Date(article.createdAt).toLocaleString()}
							</span>
						</div>
						<h3 className='text-lg font-semibold mt-2 text-gray-800'>
							{article.title.length > 40
								? `${article.title.substring(0, 40)}...`
								: article.title}
						</h3>
						<p className='text-sm text-gray-600 mt-2'>
							{article.content.length > 100 ? (
								<span
									dangerouslySetInnerHTML={{
										__html: article.content.substring(0, 100),
									}}
								/>
							) : (
								<span dangerouslySetInnerHTML={{ __html: article.content }} />
							)}
						</p>
						<Link
							to={`/articles/${article._id}`}
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

export default ArticlesPreview
