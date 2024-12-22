import { Outlet } from 'react-router-dom'
import { Footer, Header } from '../components'

const Layouts = () => {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	)
}

export default Layouts
