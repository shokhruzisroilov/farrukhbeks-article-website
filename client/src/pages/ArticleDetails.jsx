import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ArticleServices from '../services/articleServices'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../store/slices/articlesSlice'
import { FullScreenLoader } from '../components'

const ArticleDetails = () => {
	const { id } = useParams() // Extracting article ID from URL
	const dispatch = useDispatch()
	const { articles, loading, error } = useSelector(state => state.articles)

	// Fetching article data when the component mounts or when the ID changes
	useEffect(() => {
		const fetchArticle = async () => {
			dispatch(getArticlesStart())
			try {
				const article = await ArticleServices.getArticleById(id)
				dispatch(getArticlesSuccess([article])) // Only fetch one article
			} catch (err) {
				dispatch(getArticlesFailure(err.message || 'Failed to load article'))
			}
		}

		fetchArticle()
	}, [id, dispatch])

	// Handling loading and error states
	if (loading) return <FullScreenLoader />
	if (error)
		return (
			<div className='w-full min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center text-red-500 p-6 bg-white rounded-lg shadow-md'>
					{error}
				</div>
			</div>
		)

	// Finding the article based on the id
	const article = articles.find(article => article._id === id)

	// If no article is found
	if (!article)
		return (
			<div className='w-full min-h-screen bg-gray-50 flex items-center justify-center'>
				<div className='text-center text-gray-500 p-6 bg-white rounded-lg shadow-md'>
					Article not found!
				</div>
			</div>
		)

	// Render article details
	return (
		<div className='w-full min-h-screen bg-gray-50 py-8'>
			<div className='max-w-7xl mx-auto px-4'>
				{/* Article Title */}
				<h1 className='text-3xl font-bold text-gray-900 mb-4'>
					{article.title}
				</h1>

				{/* Author and Date */}
				<div className='flex justify-between text-sm text-gray-600 mb-4'>
					<p>
						<strong>Author:</strong> {article.author}
					</p>
					<p>
						<strong>Published on:</strong>{' '}
						{new Date(article.createdAt).toLocaleDateString()}
					</p>
				</div>

				{/* Article Image */}
				{article.image && (
					<img
						src={article.image}
						alt={article.title}
						className='w-full h-64 object-cover rounded-lg mb-6'
					/>
				)}

				{/* Article Content */}
				<div
					className='text-lg text-gray-800 leading-relaxed'
					dangerouslySetInnerHTML={{ __html: article.content }}
				></div>

				{/* Optional: Article Category */}
				<div className='mt-6'>
					<p className='font-semibold text-lg text-gray-700'>
						Category: {article.category}
					</p>
				</div>
			</div>
		</div>
	)
}

export default ArticleDetails
