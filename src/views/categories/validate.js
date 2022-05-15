import * as Yup from 'yup'

export const categorySchema = Yup.object({
  categoryName: Yup.string().required(),
  subtitle: Yup.string(),
  thumbnail: Yup.mixed().required(),
})
