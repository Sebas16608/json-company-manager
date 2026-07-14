import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/company/',
  headers: { 'Content-Type': 'application/json' },
})

export const getCompanies = () => api.get('companies/')
export const getBranches = () => api.get('branches/')
export const updateBranch = (id, data) => api.patch(`branches/${id}/`, data)
export const deleteBranch = (id) => api.delete(`branches/${id}/`)

export const getCollaborators = () => api.get('collaborators/')
export const updateCollaborator = (id, data) => api.patch(`collaborators/${id}/`, data)
export const deleteCollaborator = (id) => api.delete(`collaborators/${id}/`)

export default api
