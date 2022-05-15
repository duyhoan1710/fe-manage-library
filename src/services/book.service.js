import { api } from '../helpers/api'

export const getBooks = async ({ page, perPage }) => {
  const res = await api.get('/books', {
    params: { page, perPage },
  })

  return res.data
}

export const createBook = async ({ formData }) => {
  const res = await api.post(`/books`, formData)

  return res.data
}

export const updateBook = async ({ bookId, formData }) => {
  const res = await api.put(`/books/${bookId}`, formData)

  return res.data
}

export const removeBook = async ({ bookId }) => {
  const res = await api.delete(`/books/${bookId}`)

  return res.data
}
