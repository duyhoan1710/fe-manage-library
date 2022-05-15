import * as Yup from 'yup'

export const createBookSchema = Yup.object({
  title: Yup.string().required(),
  quantity: Yup.number().required(),
  description: Yup.string(),
  categoryId: Yup.string().required(),
  term: Yup.number().required(),
  thumbnail: Yup.mixed().required(),
  pdfFile: Yup.mixed().required(),
})

export const updateBookSchema = Yup.object({
  title: Yup.string().required(),
  quantity: Yup.number().required(),
  description: Yup.string(),
  categoryId: Yup.string().required(),
  term: Yup.number().required(),
  thumbnail: Yup.mixed().required(),
  pdfFile: Yup.mixed(),
})
