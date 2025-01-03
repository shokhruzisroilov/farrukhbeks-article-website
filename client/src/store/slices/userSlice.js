import { createSlice } from '@reduxjs/toolkit'
import { fetchUsersFromAPI } from '../../services/userService'

const initialState = {
	users: [],
	loading: false,
	error: null,
}

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		fetchUsersStart: state => {
			state.loading = true
			state.error = null
		},
		fetchUsersSuccess: (state, action) => {
			state.loading = false
			state.users = action.payload
		},
		fetchUsersFailure: (state, action) => {
			state.loading = false
			state.error = action.payload
		},
	},
})

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } =
	userSlice.actions

// Thunk action to fetch users from the API
export const fetchUsers = () => async dispatch => {
	try {
		dispatch(fetchUsersStart())
		const users = await fetchUsersFromAPI()
		dispatch(fetchUsersSuccess(users))
	} catch (error) {
		dispatch(fetchUsersFailure('❌ Failed to fetch users'))
	}
}

export default userSlice.reducer
