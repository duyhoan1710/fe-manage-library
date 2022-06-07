import { useQuery } from 'react-query'
import { NOTIFY } from '../constants/queriesKey'
import { getNotify } from '../services/notify.service'

export const useNotify = () => {
  const { data, isLoading, error } = useQuery(NOTIFY, async () => {
    const res = await getNotify()

    return res.data
  })

  return { data, isLoading, error }
}
