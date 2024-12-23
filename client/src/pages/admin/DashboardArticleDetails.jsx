import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ArticleServices from '../../services/articleServices'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../../store/slices/articlesSlice'
import { FullScreenLoader } from '../../components'

const DashboardArticleDetails = () => {
	const { id } = useParams() // URL'dan maqola ID sini olish
	const dispatch = useDispatch()
	const { articles, loading, error } = useSelector(state => state.articles)

	// Maqola yuklash effekti
	useEffect(() => {
		const fetchArticle = async () => {
			dispatch(getArticlesStart())
			try {
				const article = await ArticleServices.getArticleById(id)
				dispatch(getArticlesSuccess([article])) // Faqat bitta maqolani yuklash
			} catch (err) {
				dispatch(getArticlesFailure(err.message || 'Maqola yuklanmadi'))
			}
		}

		fetchArticle()
	}, [id, dispatch])

	// Yuklanish holati
	if (loading) return <FullScreenLoader />

	// Xatolik holati
	if (error)
		return (
			<div className='error-message'>
				<h2>Xatolik yuz berdi</h2>
				<p>{error}</p>
			</div>
		)

	// Maqolani topish
	const article = articles.find(article => article._id === id)

	if (!article)
		return (
			<div className='not-found-message'>
				<h2>Maqola topilmadi!</h2>
				<p>Kechirasiz, so‘ralgan maqola mavjud emas.</p>
			</div>
		)

	// Maqola detallari
	return <div>{article.title}</div>
}

export default DashboardArticleDetails
