import { api } from '../helpers/api'

export const getUsers = async () => {
  const res = api.get('/bookHirings/students')

  return res
}
