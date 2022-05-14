import dayjs from 'dayjs'

export const formatDate = (value) => {
  if (!value) return null

  return dayjs(value).format('DD/MM/YYYY')
}
