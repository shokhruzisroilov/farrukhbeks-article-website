import api from './api'

const getAllEvents = async () => (await api.get('/events')).data
const getEventDetails = async id => (await api.get(`/events/${id}`)).data
const createEvent = async eventData =>
	(await api.post('/events/create', eventData)).data
const updateEvent = async (id, eventData) =>
	(await api.put(`/events/update/${id}`, eventData)).data
const deleteEvent = async id => (await api.delete(`/events/delete/${id}`)).data

const eventService = {
	getAllEvents,
	getEventDetails,
	createEvent,
	updateEvent,
	deleteEvent,
}
export default eventService
