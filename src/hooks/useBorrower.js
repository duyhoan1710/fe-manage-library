import { useQuery } from 'react-query'
import {
  ANALYTICS,
  ANALYTICS_BOOK_IN_MONTH,
  BORROWER,
  PROMISE_BORROWER,
} from '../constants/queriesKey'
import {
  analysBook,
  analyticsBook,
  getBorrower,
  getPromiseBorrower,
} from '../services/borrower.service'

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

export const usePromiseBorrowers = ({
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
    [
      PROMISE_BORROWER,
      readerName,
      bookName,
      term,
      categoryId,
      isReturned,
      isExpired,
      pageSize,
      pageNumber,
    ],
    async () => {
      const res = await getPromiseBorrower({
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

export const useMostBookInMonth = ({ year }) => {
  const { data, isLoading, error } = useQuery([ANALYTICS_BOOK_IN_MONTH, year], async () => {
    const res = await analysBook({ year })

    return res
  })

  return { data, isLoading, error }
}
