import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createEvent,
	updateEvent,
	fetchEventDetails,
} from '../../store/slices/eventSlice'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios' // Cloudinary uchun
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Import the default theme

const DashboardEventForm = () => {
	const [formData, setFormData] = useState({
		title: '',
		description: '', // This will be handled by ReactQuill
		location: '',
		topics: '',
		speakers: '',
		image: '', // Cloudinary URL
	})
	const [uploading, setUploading] = useState(false) // Yuklash jarayoni

	const { id } = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { event } = useSelector(state => state.events)

	// Eventni tahrirlash uchun ma'lumotlarni olish
	useEffect(() => {
		if (id) dispatch(fetchEventDetails(id))
	}, [dispatch, id])

	useEffect(() => {
		if (event) setFormData(event)
	}, [event])

	// Formani o'zgartirish
	const handleChange = e => {
		const { name, value, files } = e.target
		if (name === 'image') {
			handleImageUpload(files[0]) // Faylni yuklash
		} else {
			setFormData({ ...formData, [name]: value })
		}
	}

	// Rasmni Cloudinary-ga yuklash
	const handleImageUpload = async file => {
		try {
			setUploading(true)
			const formData = new FormData()
			formData.append('file', file)
			formData.append('upload_preset', 'tedgqry3') // Cloudinary'dan preset
			formData.append('cloud_name', 'dj3epjudt') // Sizning cloud_name

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

	// Formani yuborish
	const handleSubmit = e => {
		e.preventDefault()
		if (id) {
			dispatch(updateEvent({ id, eventData: formData }))
		} else {
			dispatch(createEvent(formData))
		}
		navigate('/admin/events')
	}

	// Bekor qilishni amalga oshirish
	const handleCancel = () => {
		navigate('/admin/events')
	}

	return (
		<div className='w-full mx-auto p-6 bg-white'>
			<h1 className='text-2xl font-bold mb-4'>
				{id ? 'Tadbirni tahrirlash' : 'Tadbir yaratish'}
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
						placeholder='Tadbir nomini kiriting'
					/>
				</div>
				<div>
					<label className='block text-gray-700'>Tavsif</label>
					<ReactQuill
						value={formData.description}
						onChange={value => setFormData({ ...formData, description: value })}
						className='mt-2 p-2 border border-gray-300 rounded'
						placeholder='Tadbir tavsifini kiriting'
					/>
				</div>
				<div>
					<label className='block text-gray-700'>Joylashuv</label>
					<input
						type='text'
						name='location'
						value={formData.location}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded'
						placeholder='Tadbir joylashuvini kiriting'
					/>
				</div>
				<div>
					<label className='block text-gray-700'>Mavzular</label>
					<input
						type='text'
						name='topics'
						value={formData.topics}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded'
						placeholder='Mavzularni kiriting (vergul bilan ajratilgan)'
					/>
				</div>
				<div>
					<label className='block text-gray-700'>Spikerlar</label>
					<input
						type='text'
						name='speakers'
						value={formData.speakers}
						onChange={handleChange}
						className='w-full mt-2 p-2 border border-gray-300 rounded'
						placeholder='Spikerlarni kiriting'
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
						{id ? 'Tadbirni yangilash' : 'Tadbir yaratish'}
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

export default DashboardEventForm
