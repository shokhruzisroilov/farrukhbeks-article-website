import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'

const Banner = () => {
	return (
		<div className='px-6 py-36 bg-gradient-to-r from-[#0F172A] via-[#1E40AF] to-[#22C55E] m-auto'>
			<div className='text-white text-center'>
				<h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6'>
					Iqtisodiyot Sohasidagi Eng Yangi Ma'lumotlar
				</h1>
				<p className='text-gray-200 lg:w-3/4 mx-auto mb-8 font-medium text-lg'>
					Iqtisodiyotdagi so'nggi yangiliklar, maqolalar va tadbirlar bilan
					tanishing. Eng yangi iqtisodiy tahlillarni o'qib, bilimlaringizni
					oshiring va tahlil qobiliyatingizni rivojlantiring.
				</p>
				<div className='flex justify-center'>
					<Link
						to='/articles'
						className='text-[#FFD700] font-semibold text-lg inline-flex items-center hover:text-[#FFC107] transition-colors duration-300'
					>
						Ko'proq bilish <FaArrowRight className='mt-1 ml-2' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Banner
