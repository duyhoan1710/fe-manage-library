import * as Yup from 'yup'

export const authSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})
