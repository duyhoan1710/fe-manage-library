import { api } from '../helpers/api'

export const getAccounts = async () => {
  const res = await api.get('/accounts')

  return res
}

export const getRoles = async () => {
  const res = await api.get('/accounts/roles')

  return res
}

export const createAccount = async ({ userName, password, roleId }) => {
  const res = await api.post(`/accounts`, { userName, password, roleId })

  return res.data
}

export const updateAccount = async ({ userId, roleId }) => {
  const res = await api.put(`/accounts`, { userId, roleId })

  return res.data
}

export const removeAccount = async ({ userId }) => {
  const res = await api.delete(`/accounts/${userId}`)

  return res.data
}

export const resetPassword = async ({ recentPassword, newPassword, confirmPassword }) => {
  const res = await api.put(`/accounts/reset-password`, {
    recentPassword,
    newPassword,
    confirmPassword,
  })

  return res.data
}

export const updateInfo = async ({ userName, phoneNumber }) => {
  const res = await api.put(`/accounts/user-infomation`, {
    userName,
    phoneNumber,
  })

  return res.data
}
