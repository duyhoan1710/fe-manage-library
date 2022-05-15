import { api } from '../helpers/api'

export const login = async ({ username, password }) => {
  const res = await api.post('/accounts/login', { username, password })

  return res.data
}
