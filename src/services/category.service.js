import { api } from '../helpers/api'

export const getCategory = () => {
  return api.get('/categories')
}

export const createCategory = ({ formData }) => {
  return api.post('/categories', formData)
}

export const updateCategory = ({ categoryId, formData }) => {
  return api.put(`/categories/${categoryId}`, formData)
}

export const removeCategory = ({ categoryId }) => {
  return api.delete(`/categories/${categoryId}`)
}
