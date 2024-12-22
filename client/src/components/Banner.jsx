import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'

const Banner = () => {
	return (
		<div className='px-4 py-32 bg-black m-auto'>
			<div className='text-white text-center'>
				<h1 className='text-5xl lg:text-7xl leading-snug font-bold mb-5'>
					Iqtisodiyot va Biznes Dunyosi
				</h1>
				<p className='text-gray-100 lg:w-3/5 mx-auto mb-5 font-primary'>
					Iqtisodiy o'zgarishlar, muvaffaqiyatli biznes strategiyalari va
					iqtisodiy tahlillarni kəshf eting. O'z biznesingizni rivojlantirish
					uchun zarur bilimlarni toping.
				</p>
				<div>
					<Link
						to='/'
						className='font-medium hover:text-orange-500 inline-flex items-center py-1'
					>
						Ko'proq Bilish <FaArrowRight className='mt-1 ml-2' />
					</Link>
				</div>
			</div>
		</div>
	)
}

export default Banner
