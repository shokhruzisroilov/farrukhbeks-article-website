import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import eventService from '../../services/eventService'

// Async thunk'lar
export const fetchEvents = createAsyncThunk('events/fetchAll', async () =>
	eventService.getAllEvents()
)
export const fetchEventDetails = createAsyncThunk(
	'events/fetchDetails',
	async id => eventService.getEventDetails(id)
)
export const createEvent = createAsyncThunk('events/create', async eventData =>
	eventService.createEvent(eventData)
)
export const updateEvent = createAsyncThunk(
	'events/update',
	async ({ id, eventData }) => eventService.updateEvent(id, eventData)
)
export const deleteEvent = createAsyncThunk('events/delete', async id =>
	eventService.deleteEvent(id)
)

const eventSlice = createSlice({
	name: 'events',
	initialState: { events: [], event: null, loading: false, error: null },
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchEvents.pending, state => {
				state.loading = true
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.loading = false
				state.events = action.payload
			})
			.addCase(fetchEvents.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message
			})
			.addCase(fetchEventDetails.fulfilled, (state, action) => {
				state.event = action.payload
			})
			.addCase(createEvent.fulfilled, (state, action) => {
				state.events.push(action.payload)
			})
			.addCase(updateEvent.fulfilled, (state, action) => {
				const index = state.events.findIndex(e => e._id === action.payload._id)
				if (index !== -1) state.events[index] = action.payload
			})
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.events = state.events.filter(e => e._id !== action.payload.id)
			})
	},
})

export default eventSlice.reducer
