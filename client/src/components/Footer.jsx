import { FaFacebookF, FaInstagram, FaTelegramPlane } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import { Link } from 'react-router-dom'

const Footer = () => {
	// Telegram kanallarini ochish
	const openTelegramChannels = () => {
		window.open('https://t.me/your_channel_1', '_blank')
		window.open('https://t.me/your_channel_2', '_blank')
		window.open('https://t.me/your_channel_3', '_blank')
	}

	return (
		<div className='bg-gray-900 mt-8'>
			<div className='px-4 py-16 m-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{/* First column */}
					<div>
						<p className='font-semibold text-lg text-white'>Maqolalar</p>
						<ul className='mt-4 space-y-2'>
							<li>
								<Link
									to='/'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Bosh sahifa
								</Link>
							</li>
							<li>
								<Link
									to='/events'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Iqtisodiyot maqolalar
								</Link>
							</li>
							<li>
								<Link
									to='/events'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Iqtisodiyot tadbirlar
								</Link>
							</li>
							<li>
								<Link
									to='/events'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Iqtisodiyot atamalar
								</Link>
							</li>
						</ul>
					</div>

					{/* Second column: About */}
					<div>
						<p className='font-semibold text-lg text-white'>Haqida</p>
						<ul className='mt-4 space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Xizmatlar
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Bizning jamoa
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Kontaktlar
								</a>
							</li>
						</ul>
					</div>

					{/* Third column: Support */}
					<div>
						<p className='font-semibold text-lg text-white'>
							Qo'llab-quvvatlash
						</p>
						<ul className='mt-4 space-y-2'>
							<li>
								<a
									href='#'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Yordam
								</a>
							</li>
							<li>
								<a
									href='#'
									className='text-gray-400 transition-colors duration-300 hover:text-orange-500'
								>
									Shartlar va siyosat
								</a>
							</li>
						</ul>
					</div>

					{/* Fourth column: Social media */}
					<div>
						<p className='font-semibold text-lg text-white'>
							Ijtimoiy tarmoqlar
						</p>
						<ul className='mt-4 flex space-x-6'>
							<li>
								<a
									href='/'
									className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
								>
									<FaFacebookF size={30} />
								</a>
							</li>
							<li>
								<a
									href='/'
									className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
								>
									<FaInstagram size={30} />
								</a>
							</li>
							<li>
								<a
									href='/'
									className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
									onClick={openTelegramChannels} // Telegram ikonasini bosganda 3 ta kanalni ochadi
								>
									<FaTelegramPlane size={30} />
								</a>
							</li>
							<li>
								<a
									href='/'
									className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
								>
									<FaXTwitter size={30} />
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom section */}
				<div className='mt-8 border-t-2 border-gray-700 pt-6'>
					<p className='text-center text-gray-400 text-sm'>
						&copy; {new Date().getFullYear()} Barcha huquqlar himoyalangan.
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
