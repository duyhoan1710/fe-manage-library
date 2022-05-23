import { getRoles } from '../services/admin.service'
import { useQuery } from 'react-query'
import { ACCOUNT, PROFILE, ROLES } from '../constants/queriesKey'
import { getAccounts } from '../services/admin.service'
import jwt_decode from 'jwt-decode'

export const useProfile = () => {
  const { data, isLoading, error } = useQuery(PROFILE, async () => {
    // const res = await getAccounts()
    let data = jwt_decode(localStorage.accessToken)

    return {
      role: data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
    }
  })

  return { data, isLoading, error }
}

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
