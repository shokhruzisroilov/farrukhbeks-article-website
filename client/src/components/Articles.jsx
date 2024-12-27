import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../store/slices/articlesSlice'
import ArticleServices from '../services/articleServices'
import FullScreenLoader from './FullScreenLoader'
import ErrorMessage from './ErrorMessage'
import CategorySelection from './CategorySelection'
import ArticleCard from './ArticleCard'
import SlideBar from './SlideBar'

const Articles = () => {
	const dispatch = useDispatch()

	const { articles, loading, error } = useSelector(state => state.articles)
	const [filteredArticles, setFilteredArticles] = useState([])

	const categories = [
		'Barchasi',
		'Iqtisodiyot',
		'Makroiqtisodiyot',
		'Mikroiqtisodiyot',
		'Xalqaro',
		'Moliya',
		'Raqamli',
	]

	// Get Articles
	useEffect(() => {
		const fetchArticlesData = async () => {
			dispatch(getArticlesStart())
			try {
				const response = await ArticleServices.getArticles()
				dispatch(getArticlesSuccess(response))
			} catch (error) {
				dispatch(getArticlesFailure(error.message))
			}
		}

		fetchArticlesData()
	}, [dispatch])

	useEffect(() => {
		if (articles.length > 0) {
			setFilteredArticles(articles)
		}
	}, [articles])

	// Select Category
	const handleCategoryChange = selectedCategory => {
		if (selectedCategory === 'Barchasi') {
			setFilteredArticles(articles)
		} else {
			const filtered = articles.filter(
				article => article.category === selectedCategory
			)
			setFilteredArticles(filtered)
		}
	}

	// Loading and error handling
	if (loading) return <FullScreenLoader />
	if (error) return <ErrorMessage error={error} />

	// Check if there are no articles after filtering
	const noArticlesFound = filteredArticles.length === 0

	return (
		<div className='max-w-7xl m-auto px-4 '>
			{/* Category selection component */}
			<CategorySelection
				categories={categories}
				onCategoryChange={handleCategoryChange}
			/>

			{/* Article cards section */}
			<div className='flex flex-col lg:flex-row gap-12'>
				<div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
					{filteredArticles.map(article => (
						<ArticleCard
							key={article._id}
							id={article._id}
							image={article.image}
							title={article.title}
							content={article.content}
							createdAt={article.createdAt}
							category={article.category}
						/>
					))}
				</div>
				{/* Show message if no articles are found */}
				{noArticlesFound && (
					<p className='text-center text-xl text-gray-500 mt-8 w-full'>
						Hozircha maqolalar mavjud emas.
					</p>
				)}
				<SlideBar />
			</div>
		</div>
	)
}

export default Articles
