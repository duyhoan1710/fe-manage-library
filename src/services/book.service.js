import { api } from '../helpers/api'

export const getBooks = async (params) => {
  const res = await api.get('/books', {
    params,
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

export const getHiringBooks = async (params) => {
  const res = await api.get('/books', {
    params,
  })

  return res.data
}

export const getReturnBooks = async (params) => {
  const res = await api.get('/books', {
    params,
  })

  return res.data
}

export const getExpireBooks = async (params) => {
  const res = await api.get('/books', {
    params,
  })

  return res.data
}
