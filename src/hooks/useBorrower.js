import { useQuery } from 'react-query'
import { ANALYTICS, BORROWER } from '../constants/queriesKey'
import { analyticsBook, getBorrower } from '../services/borrower.service'

export const useBorrowers = ({
  readerName,
  bookName,
  term,
  categoryId,
  isReturned,
  isExpired,
  pageSize,
  pageNumber,
}) => {
  const { data, isLoading, error } = useQuery(
    [BORROWER, readerName, bookName, term, categoryId, isReturned, isExpired, pageSize, pageNumber],
    async () => {
      const res = await getBorrower({
        readerName,
        bookName,
        term,
        categoryId,
        isReturned,
        isExpired,
        pageSize,
        pageNumber,
      })

      return res
    },
  )

  return { data, isLoading, error }
}

export const useAnalyticsBook = () => {
  const { data, isLoading, error } = useQuery([ANALYTICS], async () => {
    const res = await analyticsBook()

    return res
  })

  return { data, isLoading, error }
}
