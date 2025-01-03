import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../store/slices/userSlice'
import { FullScreenLoader, ErrorMessage } from '../../components'

const DashboardUsers = () => {
	// Dispatch and selector from Redux store
	const dispatch = useDispatch()
	const { users, loading, error } = useSelector(state => state.users)

	useEffect(() => {
		dispatch(fetchUsers()) // Fetch users when the component mounts
	}, [dispatch])

	// Show loading or error messages
	if (loading) return <FullScreenLoader />
	if (error) return <ErrorMessage message={error} />

	return (
		<div className='container mx-auto bg-orange-50 min-h-screen'>
			<div className='overflow-x-auto bg-white shadow-lg rounded-lg'>
				<table className='w-full table-auto border-collapse border border-gray-200'>
					<thead>
						<tr className='bg-orange-500 text-white'>
							<th className='p-3 border'>#</th>
							<th className='p-3 border'>Name</th>
							<th className='p-3 border'>Email</th>
							<th className='p-3 border'>Role</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr
								key={user._id}
								className='hover:bg-orange-100 even:bg-orange-50'
							>
								<td className='p-3 border text-center'>{index + 1}</td>
								<td className='p-3 border'>{user.username}</td>
								<td className='p-3 border'>{user.email}</td>
								<td className='p-3 border text-center'>
									{user.isAdmin ? (
										<span className='text-orange-500 font-semibold'>Admin</span>
									) : (
										<span className='text-gray-500'>User</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default DashboardUsers
