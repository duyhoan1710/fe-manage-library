import { api } from '../helpers/api'

export const getNotify = () => {
  return api.get('/news')
}

export const createNotify = (payload) => {
  return api.post('/news', payload)
}

export const updateNotify = ({ id, ...payload }) => {
  return api.put(`/news/${id}`, payload)
}

export const removeNotify = ({ id }) => {
  return api.delete(`/news/${id}`)
}
