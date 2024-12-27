import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

// Registering necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Dashboard = () => {
	const { articles } = useSelector(state => state.articles)
	const { events } = useSelector(state => state.events)
	const { terms } = useSelector(state => state.terms)

	// Helper function to get the month from a date string (e.g. '2024-01-15' -> 'Yanvar')
	const getMonthName = dateString => {
		const months = [
			'Yanvar',
			'Fevral',
			'Mart',
			'Aprel',
			'May',
			'Iyun',
			'Iyul',
			'Avgust',
			'Sentabr',
			'Oktyabr',
			'Noyabr',
			'Dekabr',
		]
		const date = new Date(dateString)
		return months[date.getMonth()]
	}

	// Calculate the number of articles per month
	const monthlyArticlesCount = articles => {
		const counts = {
			Yanvar: 0,
			Fevral: 0,
			Mart: 0,
			Aprel: 0,
			May: 0,
			Iyun: 0,
			Iyul: 0,
			Avgust: 0,
			Sentabr: 0,
			Oktyabr: 0,
			Noyabr: 0,
			Dekabr: 0,
		}

		// Loop through articles and count articles per month
		articles.forEach(article => {
			const month = getMonthName(article.createdAt)
			counts[month]++
		})

		return counts
	}

	// Get the monthly article count
	const articleCounts = monthlyArticlesCount(articles)

	// Chart data for the bar chart
	const chartData = {
		labels: [
			'Yanvar',
			'Fevral',
			'Mart',
			'Aprel',
			'May',
			'Iyun',
			'Iyul',
			'Avgust',
			'Sentabr',
			'Oktyabr',
			'Noyabr',
			'Dekabr',
		], // X-axis labels (months in Uzbek)
		datasets: [
			{
				label: 'Umumiy Maqolalar', // Label for the dataset (Total Articles in Uzbek)
				data: [
					articleCounts.Yanvar,
					articleCounts.Fevral,
					articleCounts.Mart,
					articleCounts.Aprel,
					articleCounts.May,
					articleCounts.Iyun,
					articleCounts.Iyul,
					articleCounts.Avgust,
					articleCounts.Sentabr,
					articleCounts.Oktyabr,
					articleCounts.Noyabr,
					articleCounts.Dekabr,
				], // Data for the chart (number of articles for each month)
				backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
				borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
				borderWidth: 1, // Bar border width
			},
		],
	}

	// Chart options for customization
	const chartOptions = {
		responsive: true, // Ensures the chart is responsive
		scales: {
			y: {
				beginAtZero: true, // Y-axis starts from zero
			},
		},
	}

	return (
		<div className='p-6'>
			<h1 className='text-3xl font-bold text-center mb-6'>Admin Panel</h1>

			{/* Statistics Cards Section */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
				{/* Total Articles Card */}
				<div className='bg-gray-700 p-6 rounded-lg shadow-lg'>
					<h3 className='text-xl font-semibold text-white'>Umumiy Maqolalar</h3>
					<p className='text-3xl font-bold text-white'>
						{articles.length} {/* Displaying the dynamic totalArticles */}
					</p>
				</div>

				{/* Total Events Card */}
				<div className='bg-gray-700 p-6 rounded-lg shadow-lg'>
					<h3 className='text-xl font-semibold text-white'>Umumiy Tadbirlar</h3>
					<p className='text-3xl font-bold text-white'>{events.length}</p>{' '}
					{/* Displaying the dynamic totalEvents */}
				</div>

				{/* Total Terms Card */}
				<div className='bg-gray-700 p-6 rounded-lg shadow-lg'>
					<h3 className='text-xl font-semibold text-white'>Umumiy Atamalar</h3>
					<p className='text-3xl font-bold text-white'>{terms.length}</p>{' '}
					{/* Displaying the dynamic totalTerms */}
				</div>

				{/* Total Users Card */}
				<div className='bg-gray-700 p-6 rounded-lg shadow-lg'>
					<h3 className='text-xl font-semibold text-white'>
						Umumiy Foydalanuvchilar
					</h3>
				</div>
			</div>

			{/* Chart Section */}
			<div className='mt-6 bg-gray-700 p-6 rounded-lg shadow-lg'>
				<h3 className='text-xl font-semibold text-white mb-4'>
					Maqola O‘sishining Oylik Ko‘rsatkichi
				</h3>
				<Bar data={chartData} options={chartOptions} />{' '}
				{/* Rendering the bar chart */}
			</div>
		</div>
	)
}

export default Dashboard
