import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório'
  },
  string: {
    email: 'E-mail inválido'
  }
})

export default {
  login: yup.object().shape({
    email: yup.string().required().email(),
    password: yup
      .string()
      .required()
      .min(8, ({ min }) => `Deve ter no mínimo ${min} caracteres`)
  })
}
