import { useQuery } from 'react-query'
import { BOOK } from '../constants/queriesKey'
import { getBooks } from '../services/book.service'

export const useBooks = ({ pageNumber = 1, pageSize = 20, searchKey }) => {
  const { data, isLoading, error } = useQuery([BOOK, pageNumber, searchKey], async () => {
    const res = await getBooks({ pageNumber, pageSize, searchKey })

    return res
  })

  return { data, isLoading, error }
}
