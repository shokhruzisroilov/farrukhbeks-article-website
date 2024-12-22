import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticlesStart,
	getArticlesSuccess,
	getArticlesFailure,
} from '../store/slices/articlesSlice'
import FullScreenLoader from './FullScreenLoader'
import ErrorMessage from './ErrorMessage'
import ArticleServices from '../services/articleServices'
import ArticleCard from './ArticleCard'
import CategorySelection from './CategorySelection'
import SlideBar from './SlideBar'

const Articles = () => {
	const dispatch = useDispatch()

	const { articles, loading, error } = useSelector(state => state.articles)
	const [filteredArticles, setFilteredArticles] = useState([])
	const categories = [
		'Barchasi',
		'Biznes',
		'Iqtisodiyot',
		"Fan va Ta'lim",
		'Falsafa',
		'Miya Ilmi',
		'Siyosat',
	]

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
		<div className='w-full'>
			<div className='max-w-7xl m-auto px-4 '>
				{/* Category selection component */}
				<CategorySelection
					categories={categories}
					onCategoryChange={handleCategoryChange}
				/>

				{/* Show message if no articles are found */}
				{noArticlesFound && (
					<p className='text-center text-xl text-gray-500 mt-8'>
						Hozircha maqolalar mavjud emas.
					</p>
				)}

				{/* Article cards section */}
				<div className='flex flex-col lg:flex-row gap-12'>
					<div className='grid md:grid-cols-2 grid-cols-1 gap-8'>
						{filteredArticles.map(article => (
							<ArticleCard
								key={article._id}
								image={article.image}
								title={article.title}
								content={article.content}
								published_date={article.published_date}
								category={article.category}
							/>
						))}
					</div>
					<SlideBar />
				</div>
			</div>
		</div>
	)
}

export default Articles
