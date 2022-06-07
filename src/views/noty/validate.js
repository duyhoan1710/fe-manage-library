import * as Yup from 'yup'

export const createNotifySchema = Yup.object({
  title: Yup.string().required(),
  content: Yup.string(),
})

export const updateNotifySchema = Yup.object({
  title: Yup.string().required(),
  content: Yup.string(),
})
