import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import {
	createArticleStart,
	createArticleSuccess,
	createArticleFailure,
} from '../../store/slices/articlesSlice'
import ArticleServices from '../../services/articleServices'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios' // Make sure axios is installed

const DashboardCreateArticle = ({ isOpen, onClose, fetchArticlesData }) => {
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')
	const [image, setImage] = useState('')
	const [category, setCategory] = useState('')
	const [tags, setTags] = useState('')
	const [imageUploading, setImageUploading] = useState(false)

	const dispatch = useDispatch()
	const { loading } = useSelector(state => state.articles)

	// Predefined list of categories
	const categories = [
		'Barchasi',
		'Iqtisodiyot',
		'Makroiqtisodiyot',
		'Mikroiqtisodiyot',
		'Xalqaro',
		'Moliya',
		'Raqamli',
	]

	if (!isOpen) return null

	// Function to handle image upload to Cloudinary
	const handleImageUpload = async e => {
		const file = e.target.files[0]
		if (file) {
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'tedgqry3') // replace with your Cloudinary upload preset

			setImageUploading(true)
			try {
				// Upload image to Cloudinary
				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/dj3epjudt/image/upload`,
					formData
				)
				setImage(response.data.secure_url) // Set the Cloudinary URL in state
				setImageUploading(false)
			} catch (error) {
				toast.error('Rasmni yuklashda xato yuz berdi.')
				setImageUploading(false)
			}
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const articleData = {
			title,
			image,
			category,
			content,
			tags: tags.split(',').map(tag => tag.trim()),
		}

		try {
			dispatch(createArticleStart())

			// Optimistically update the UI with the new article data
			const newArticle = await ArticleServices.createArticle(articleData)
			// Dispatch success action
			dispatch(createArticleSuccess(newArticle))
			// Reset form and modal, stop loading
			setTitle('')
			setImage('')
			setCategory('')
			setTags('')
			setContent('')
			toast.success('Maqola muvaffaqiyatli yaratildi!')
			onClose()
			fetchArticlesData()
		} catch (error) {
			toast.error(error.response?.data?.error || 'Xato yuz berdi')
			dispatch(
				createArticleFailure(error.response?.data?.error || 'Xato yuz berdi')
			)
		}
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50'>
			<ToastContainer />
			<div className='bg-white p-6 rounded-lg shadow-lg md:w-3/4 w-full max-h-[90vh] overflow-y-auto'>
				<h2 className='text-2xl font-bold mb-4 text-orange-600'>
					📝 Yangi Maqola Qo'shish
				</h2>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
					<input
						type='text'
						placeholder='Sarlavha'
						name='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						className='border p-2 rounded-md'
					/>

					{/* Image Upload */}
					<input
						type='file'
						accept='image/*'
						onChange={handleImageUpload}
						className='border p-2 rounded-md'
					/>
					{image && (
						<img
							src={image}
							alt='Uploaded'
							className='my-4 max-w-full h-auto'
						/>
					)}
					{imageUploading && <p>Rasm yuklanmoqda...</p>}

					{/* Dropdown for categories */}
					<select
						name='category'
						value={category}
						onChange={e => setCategory(e.target.value)}
						className='border p-2 rounded-md'
					>
						<option value=''>Kategoriya tanlang</option>
						{categories.map((category, index) => (
							<option key={index} value={category}>
								{category}
							</option>
						))}
					</select>

					<label className='font-semibold'>Tarkib</label>
					<ReactQuill
						value={content}
						onChange={setContent}
						placeholder='Maqola tarkibini kiriting...'
						className='h-48 mb-4'
					/>
					<input
						type='text'
						placeholder='Teglar (vergul bilan ajrating)'
						name='tags'
						value={tags}
						onChange={e => setTags(e.target.value)}
						className='border p-2 rounded-md mt-5'
					/>
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
							disabled={loading || imageUploading}
						>
							{loading ? 'Yaratilyapti...' : '✅ Saqlash'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default DashboardCreateArticle
