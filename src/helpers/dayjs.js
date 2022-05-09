import dayjs from 'dayjs'

export const formatDate = (value) => {
  return dayjs(value).format('DD/MM/YYYY') || value
}
