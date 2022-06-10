import { useQuery } from 'react-query'
import {
  ANALYTICS,
  ANALYTICS_BOOK_BY_TERM,
  ANALYTICS_BOOK_IN_MONTH,
  BORROWER,
  PROMISE_BORROWER,
  RETURN,
} from '../constants/queriesKey'
import {
  analysBook,
  analysBookByTerm,
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

export const useReturns = ({
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
    [RETURN, readerName, bookName, term, categoryId, isReturned, isExpired, pageSize, pageNumber],
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

export const useMostBookByTerm = () => {
  const { data, isLoading, error } = useQuery([ANALYTICS_BOOK_BY_TERM], async () => {
    const res = await analysBookByTerm()

    return res
  })

  return { data, isLoading, error }
}
