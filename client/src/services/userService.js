import api from './api' // Import the api instance

// Service function to fetch all users from the API
export const fetchUsersFromAPI = async () => {
	try {
		const response = await api.get('/users')
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch users')
	}
}
