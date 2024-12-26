import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getArticlesFailure,
	getArticlesStart,
	getArticlesSuccess,
	deleteArticleStart,
	deleteArticleSuccess,
	deleteArticleFailure,
} from '../../store/slices/articlesSlice'
import ArticleServices from '../../services/articleServices'
import {
	DashboardArticleCard,
	DashboardCreateArticle,
	DashboardEditArticle,
} from '../../components/admin'
import { FullScreenLoader } from '../../components'

const DashboardArticles = () => {
	const dispatch = useDispatch()
	const { articles, loading } = useSelector(state => state.articles)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [currentArticleId, setCurrentArticleId] = useState(null)

	// All Articles
	const fetchArticlesData = async () => {
		dispatch(getArticlesStart())
		try {
			const response = await ArticleServices.getArticles()
			dispatch(getArticlesSuccess(response))
		} catch (error) {
			dispatch(getArticlesFailure(error))
		}
	}

	useEffect(() => {
		fetchArticlesData()
	}, [dispatch])

	// Handle Delete Article
	const handleDelete = async id => {
		const isConfirmed = window.confirm('Maqolani o‘chirishni tasdiqlaysizmi?')
		if (!isConfirmed) return

		dispatch(deleteArticleStart())
		try {
			await ArticleServices.deleteArticle(id)
			dispatch(deleteArticleSuccess(id))
		} catch (error) {
			dispatch(deleteArticleFailure(error))
		}
	}

	// Article id
	const handleEditClick = articleId => {
		setCurrentArticleId(articleId)
		setIsEditModalOpen(true)
	}

	// Render Loading State
	if (loading) return <FullScreenLoader />

	// Render Main Dashboard UI
	return (
		<div className='w-full p-6 bg-gray-50'>
			<div className='flex flex-col md:flex-row justify-between items-center mb-8'>
				<h1 className='text-3xl font-bold text-orange-600'>
					📚 Maqolalar ro'yxati
				</h1>
				<button
					className='mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md shadow-md'
					onClick={() => setIsModalOpen(true)}
				>
					➕ Yangi maqola qo'shish
				</button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
				{articles && articles.length > 0 ? (
					articles.map(article => (
						<DashboardArticleCard
							key={article._id}
							article={article}
							onDeleteClick={handleDelete}
							onEditClick={handleEditClick}
						/>
					))
				) : (
					<p className='text-center text-xl text-orange-400 mt-10'>
						⚠️ Hozircha maqolalar mavjud emas.
					</p>
				)}
			</div>

			<DashboardCreateArticle
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				fetchArticlesData={fetchArticlesData}
			/>
			<DashboardEditArticle
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				articleId={currentArticleId}
				fetchArticlesData={fetchArticlesData}
			/>
		</div>
	)
}

export default DashboardArticles
