import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/company/',
})

export const getCompanies = () => api.get('companies/')
export const updateCompany = (id, data) => api.patch(`companies/${id}/`, data)
export const deleteCompany = (id) => api.delete(`companies/${id}/`)

export const getBranches = () => api.get('branches/')
export const updateBranch = (id, data) => api.patch(`branches/${id}/`, data)
export const deleteBranch = (id) => api.delete(`branches/${id}/`)

export const getCollaborators = () => api.get('collaborators/')
export const updateCollaborator = (id, data) => api.patch(`collaborators/${id}/`, data)
export const deleteCollaborator = (id) => api.delete(`collaborators/${id}/`)

export const importCompany = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return api.post('companies/import/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export default api
