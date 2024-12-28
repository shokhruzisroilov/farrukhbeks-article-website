import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createTerm,
	updateTerm,
	fetchTermDetails,
} from '../../store/slices/termSlice'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios' // Cloudinary for image upload
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the default theme

const DashboardTermForm = () => {
	const [formData, setFormData] = useState({
		title: '',
		description: '', // This will be handled by ReactQuill
		image: '', // Cloudinary URL
	})
	const [uploading, setUploading] = useState(false) // Uploading state

	const { id } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { term } = useSelector(state => state.terms)

	// Fetch term details if editing an existing term
	useEffect(() => {
		if (id) dispatch(fetchTermDetails(id))
	}, [dispatch, id])

	useEffect(() => {
		if (term) setFormData(term)
	}, [term])

	// Handle form changes
	const handleChange = e => {
		const { name, value, files } = e.target
		if (name === 'image') {
			handleImageUpload(files[0]) // Handle image upload
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	// Upload image to Cloudinary
	const handleImageUpload = async file => {
		try {
			setUploading(true)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'tedgqry3') // Cloudinary preset
			formData.append('cloud_name', 'dj3epjudt') // Your cloud_name

			const res = await axios.post(
				'https://api.cloudinary.com/v1_1/dj3epjudt/image/upload', // Cloudinary API URL
				formData
			)

			setFormData(prev => ({ ...prev, image: res.data.secure_url }))
			setUploading(false)
		} catch (error) {
			console.error('Image upload failed:', error)
			setUploading(false)
		}
	}

	// Handle form submit
	const handleSubmit = e => {
		e.preventDefault()
		if (id) {
			dispatch(updateTerm({ id, termData: formData }))
		} else {
			dispatch(createTerm(formData))
		}
		navigate('/admin/terms') // Navigate back to terms list
	}

	// Handle cancel
	const handleCancel = () => {
		navigate('/admin/terms')
	}

	return (
		<div className='w-full mx-auto p-6 bg-white'>
			<h1 className='text-2xl font-bold mb-4'>
				{id ? 'Atamani tahrirlash' : 'Atama yaratish'}
			</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-gray-700'>Nom</label>
					<input
						type='text'
						name='title'
						value={formData.title}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded'
						placeholder='Atama nomini kiriting'
					/>
				</div>
				<div>
					<label className='block text-gray-700'>Tavsif</label>
					<ReactQuill
						value={formData.description}
						onChange={value => setFormData({ ...formData, description: value })}
						className='mt-2 p-2 border border-gray-300 rounded'
						placeholder='Atama tavsifini kiriting'
					/>
				</div>
				<div>
					<label className='block text-gray-700'>Rasm</label>
					<input
						type='file'
						name='image'
						accept='image/*'
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded'
					/>
					{uploading && <p>Yuklanmoqda...</p>}
					{formData.image && (
						<img
							src={formData.image}
							alt='Preview'
							className='mt-2 w-32 h-32 object-cover rounded'
						/>
					)}
				</div>
				<div className='flex space-x-4'>
					<button
						type='submit'
						className='w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition'
					>
						{id ? 'Atamani yangilash' : 'Atama yaratish'}
					</button>
					<button
						type='button'
						onClick={handleCancel}
						className='w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition'
					>
						Bekor qilish
					</button>
				</div>
			</form>
		</div>
	)
}

export default DashboardTermForm
