import * as Yup from 'yup'

export const createBorrowerSchema = Yup.object({
  studentIdentify: Yup.string().required(),
  bookId: Yup.string().required(),
  expiredDate: Yup.string().required(),
})

export const updateBorrowerSchema = Yup.object({
  studentIdentify: Yup.string().required(),
  bookId: Yup.string().required(),
  expiredDate: Yup.string().required(),
  returnDate: Yup.string(),
})
