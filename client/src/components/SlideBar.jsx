import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import { useMemo } from 'react'

const SlideBar = () => {
	const { articles } = useSelector(state => state.articles)

	// Memoization orqali tartiblashni optimallashtirish
	const sortedArticles = useMemo(() => {
		return [...articles]
			.sort((a, b) => new Date(b.date) - new Date(a.date))
			.slice(0, 10)
	}, [articles])

	// Loading yoki bo‘sh holat
	if (!articles.length) {
		return <p className='text-center'>Maqolalar mavjud emas.</p>
	}

	return (
		<div className='max-w-[300px]'>
			<h3 className='text-2xl font-semibold px-4'>So'nggi maqolalar</h3>
			<div>
				{sortedArticles.map(article => (
					<div
						key={article._id}
						className='my-5 border-b-2 border-spacing-2 px-4'
					>
						<h4 className='font-medium mb-2'>{article.title}</h4>
						<Link
							to={`/articles/${article._id}`}
							className='text-base pb-2 hover:text-orange-500 inline-flex items-center'
							aria-label={`Read more about ${article.title}`}
						>
							Ko'proq <FaArrowRight className='mt-1 ml-2 text-sm' />
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}

export default SlideBar
