import * as Yup from 'yup'

export const resetPasswordSchema = Yup.object({
  recentPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string().required(),
})

export const changeInfoSchema = Yup.object({
  userName: Yup.string().required(),
  phoneNumber: Yup.string().required(),
})
