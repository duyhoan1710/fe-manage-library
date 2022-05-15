import { useQuery } from 'react-query'
import { BOOK } from '../constants/queriesKey'
import { getBooks } from '../services/book.service'

export const useBooks = ({ page = 1, perPage = 20 }) => {
  const { data, isLoading, error } = useQuery(BOOK, async () => {
    const res = await getBooks({ page, perPage })

    return res.data
  })

  return { data, isLoading, error }
}
