import * as Yup from 'yup'

export const bookSchema = Yup.object({
  title: Yup.string().required(),
  quantity: Yup.number().required(),
  description: Yup.string(),
  categoryId: Yup.number().required(),
  thumbnail: Yup.mixed().required(),
  pdfFile: Yup.mixed().required(),
})
