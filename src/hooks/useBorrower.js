import { useQuery } from 'react-query'
import { BORROWER } from '../constants/queriesKey'
import { getBorrower } from '../services/borrower.service'

export const useBorrowers = ({ page = 1, perPage = 20 }) => {
  const { data, isLoading, error } = useQuery(BORROWER, async () => {
    const res = await getBorrower({ page, perPage })

    return res.data
  })

  return { data, isLoading, error }
}
