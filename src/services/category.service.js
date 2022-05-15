import { api } from '../helpers/api'

export const getCategory = () => {
  return api.get('/categories')
}

export const createCategory = ({ categoryName }) => {
  return api.post('/categories', { categoryName })
}

export const updateCategory = ({ categoryId, categoryName }) => {
  return api.put(`/categories/${categoryId}`, { categoryName })
}

export const removeCategory = ({ categoryId }) => {
  return api.delete(`/categories/${categoryId}`)
}
