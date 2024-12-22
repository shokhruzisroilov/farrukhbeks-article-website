
const ErrorMessage = ({ error }) => {
	return (
		<div className='bg-red-600 text-white p-6 rounded-lg shadow-md max-w-lg mx-auto my-8 text-center'>
			<strong className='text-xl font-bold'>
				Voy! Nimaedir noto'g'ri bo'ldi.
			</strong>
			<p className='mt-2 text-lg'>
				{error}. Iltimos, keyinroq qayta urinib ko'ring yoki yordam uchun
				murojaat qiling.
			</p>
		</div>
	)
}

export default ErrorMessage
