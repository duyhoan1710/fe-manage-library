import * as Yup from 'yup'

export const createCategorySchema = Yup.object({
  categoryName: Yup.string().required(),
  subtitle: Yup.string(),
  thumbnail: Yup.mixed().required(),
})

export const updateCategorySchema = Yup.object({
  categoryName: Yup.string().required(),
  subtitle: Yup.string(),
  thumbnail: Yup.mixed(),
})
