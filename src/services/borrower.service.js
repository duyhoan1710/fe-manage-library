import { api } from '../helpers/api'

export const createBorrower = async ({ studentIdentify, bookId, expiredDate }) => {
  const res = await api.post('/bookHirings/hire-books', { studentIdentify, bookId, expiredDate })

  return res.data
}
