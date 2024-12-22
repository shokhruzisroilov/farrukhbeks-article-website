const FullScreenLoader = () => {
	return (
		<div className='fixed inset-0 bg-white flex justify-center items-center z-50'>
			<div className='flex flex-col items-center gap-4'>
				<div className='loader'></div>
				<h2 className='text-2xl font-bold text-red-500'>Yuklanmoqda...</h2>
			</div>
		</div>
	)
}

export default FullScreenLoader
