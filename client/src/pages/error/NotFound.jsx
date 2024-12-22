const NotFound = () => {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='text-center'>
				<h1 className='text-6xl font-extrabold text-red-600'>404</h1>
				<p className='mt-4 text-2xl text-gray-700'>
					Sahifa topilmadi. Iltimos, manzilni tekshirib ko'ring.
				</p>
				<a
					href='/'
					className='mt-6 inline-block px-6 py-3 bg-orange-700 text-white rounded-md shadow-lg hover:bg-orange-600'
				>
					Asosiy sahifaga qaytish
				</a>
			</div>
		</div>
	)
}

export default NotFound
