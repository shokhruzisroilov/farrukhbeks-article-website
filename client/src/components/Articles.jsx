import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../store/slices/articlesSlice'
import { getArticles } from '../services/articleServices'
import FullScreenLoader from './FullScreenLoader'
import ErrorMessage from './ErrorMessage'

const Articles = () => {
	const dispatch = useDispatch()

	const { articles, loading, error } = useSelector(state => state.articles)
	console.log(articles)

	useEffect(() => {
		const fetchArticlesData = async () => {
			dispatch(getArticlesStart())
			try {
				const response = await getArticles()
				dispatch(getArticlesSuccess(response))
			} catch (error) {
				dispatch(getArticlesFailure(error.message))
			}
		}

		fetchArticlesData()
	}, [dispatch])

	if (loading) return <FullScreenLoader />
	if (error) return <ErrorMessage error={error} />

	return <div></div>
}

export default Articles
