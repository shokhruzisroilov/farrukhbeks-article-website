import { useState, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	updateArticleStart,
	updateArticleSuccess,
	updateArticleFailure,
} from '../../store/slices/articlesSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ArticleServices from '../../services/articleServices'

const DashboardEditArticle = ({
	isOpen,
	onClose,
	fetchArticlesData,
	articleId,
}) => {
	const dispatch = useDispatch()

	// Select articles from Redux store
	const { articles, loading } = useSelector(state => state.articles)
	const article = articles.find(item => item._id === articleId) || null

	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('')
	const [tags, setTags] = useState('')

	const categories = [
		'Biznes',
		'Iqtisodiyot',
		"Fan va Ta'lim",
		'Falsafa',
		'Miya Ilmi',
		'Siyosat',
	]

	// Populate form fields when the modal opens
	useEffect(() => {
		if (isOpen && article) {
			setTitle(article.title)
			setImage(article.image)
			setCategory(article.category)
			setContent(article.content)
			setTags(article.tags.join(', '))
		}
	}, [isOpen, article])

	// Handle form submission
	const handleSubmit = async e => {
		e.preventDefault()

		const updatedArticleData = {
			title,
			image,
			category,
			content,
			tags: tags.split(',').map(tag => tag.trim()),
		}

		try {
			dispatch(updateArticleStart())
			const updatedArticle = await ArticleServices.updateArticle(
				articleId,
				updatedArticleData
			)
			dispatch(updateArticleSuccess(updatedArticle))
			fetchArticlesData()
			onClose()
		} catch (error) {
			toast.error(error.response?.data?.error || 'Xato yuz berdi')
			dispatch(
				updateArticleFailure(error.response?.data?.error || 'Xato yuz berdi')
			)
		}
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50'>
			<ToastContainer />
			<div className='bg-white p-6 rounded-lg shadow-lg md:w-3/4 w-full max-h-[90vh] overflow-y-auto'>
				<h2 className='text-2xl font-bold mb-4 text-orange-600'>
					📝 Maqolani Tahrirlash
				</h2>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					{/* Title Input */}
					<input
						type='text'
						placeholder='Sarlavha'
						name='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='border p-2 rounded-md'
					/>

					{/* Image URL Input */}
					<input
						type='text'
						placeholder='Rasm URL'
						name='image'
						value={image}
						onChange={e => setImage(e.target.value)}
						className='border p-2 rounded-md'
					/>

					{/* Category Select */}
					<select
						name='category'
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='border p-2 rounded-md'
					>
						<option value=''>Kategoriya tanlang</option>
						{categories.map((cat, index) => (
							<option key={index} value={cat}>
								{cat}
							</option>
						))}
					</select>

					{/* Content Editor */}
					<label className='font-semibold'>Tarkib</label>
					<ReactQuill
						value={content}
						onChange={setContent}
						placeholder='Maqola tarkibini kiriting...'
						className='h-48 mb-4'
					/>

					{/* Tags Input */}
					<input
						type='text'
						placeholder='Teglar (vergul bilan ajrating)'
						name='tags'
						value={tags}
						onChange={e => setTags(e.target.value)}
						className='border p-2 rounded-md mt-5'
					/>

					{/* Action Buttons */}
					<div className='flex justify-between mt-4'>
						<button
							type='button'
							onClick={() => {
								setTitle('')
								setImage('')
								setCategory('')
								setTags('')
								setContent('')
								onClose()
							}}
							className='bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md'
						>
							Bekor qilish
						</button>
						<button
							type='submit'
							className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md'
							disabled={loading}
						>
							{loading ? 'Saqlanyapti...' : '✅ Saqlash'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DashboardEditArticle
