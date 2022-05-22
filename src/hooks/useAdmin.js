import { getRoles } from '../services/admin.service'
import { useQuery } from 'react-query'
import { ACCOUNT, ROLES } from '../constants/queriesKey'
import { getAccounts } from '../services/admin.service'

export const useAccounts = () => {
  const { data, isLoading, error } = useQuery(ACCOUNT, async () => {
    const res = await getAccounts()

    return res.data
  })

  return { data, isLoading, error }
}

export const useRoles = () => {
  const { data, isLoading, error } = useQuery(ROLES, async () => {
    const res = await getRoles()

    return res.data
  })

  return { data, isLoading, error }
}
