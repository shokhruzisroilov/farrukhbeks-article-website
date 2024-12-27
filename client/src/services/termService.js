import api from './api'

const getAllTerms = async () => (await api.get('/terms')).data
const getTermDetails = async id => (await api.get(`/terms/${id}`)).data
const createTerm = async termData =>
	(await api.post('/terms/create', termData)).data
const updateTerm = async (id, termData) =>
	(await api.put(`/terms/update/${id}`, termData)).data
const deleteTerm = async id => (await api.delete(`/terms/delete/${id}`)).data

const termService = {
	getAllTerms,
	getTermDetails,
	createTerm,
	updateTerm,
	deleteTerm,
}

export default termService
