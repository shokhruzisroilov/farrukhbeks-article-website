import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import termService from '../../services/termService'

// Async thunk'lar
export const fetchTerms = createAsyncThunk('terms/fetchAll', async () =>
	termService.getAllTerms()
)
export const fetchTermDetails = createAsyncThunk(
	'terms/fetchDetails',
	async id => termService.getTermDetails(id)
)
export const createTerm = createAsyncThunk('terms/create', async termData =>
	termService.createTerm(termData)
)
export const updateTerm = createAsyncThunk(
	'terms/update',
	async ({ id, termData }) => termService.updateTerm(id, termData)
)
export const deleteTerm = createAsyncThunk('terms/delete', async id =>
	termService.deleteTerm(id)
)

const termSlice = createSlice({
	name: 'terms',
	initialState: { terms: [], term: null, loading: false, error: null },
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchTerms.pending, state => {
				state.loading = true
			})
			.addCase(fetchTerms.fulfilled, (state, action) => {
				state.loading = false
				state.terms = action.payload
			})
			.addCase(fetchTerms.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(fetchTermDetails.fulfilled, (state, action) => {
				state.term = action.payload
			})
			.addCase(createTerm.fulfilled, (state, action) => {
				state.terms.push(action.payload)
			})
			.addCase(updateTerm.fulfilled, (state, action) => {
				const index = state.terms.findIndex(t => t._id === action.payload._id)
				if (index !== -1) state.terms[index] = action.payload
			})
			.addCase(deleteTerm.fulfilled, (state, action) => {
				state.terms = state.terms.filter(t => t._id !== action.payload.id)
			})
	},
})

export default termSlice.reducer
