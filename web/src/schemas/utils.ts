import * as yup from 'yup'
import { getAge, isValidCPF } from 'utils'

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
    password: yup.string().required()
  }),
  registerDonation: yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required()
  }),
  registerUser: yup.object().shape({
    terms_conditions: yup
      .bool()
      .oneOf(
        [true],
        'Campo obrigatório para realizar o cadastro na plataforma'
      ),
    name: yup
      .string()
      .required()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g,
        'Digite um nome válido'
      ),
    surname: yup
      .string()
      .required()
      .matches(
        /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/g,
        'Digite um nome válido'
      ),
    email: yup.string().required().email(),
    cpf_cnpj: yup
      .string()
      .required()
      .test('is-cpf-valid', 'CPF inválido', value => {
        if (!value) return false
        if (value.length <= 11) {
          return isValidCPF(value)
        }
        return true
      })
      .test('is-cnpj-valid', 'CNPJ inválido', value => {
        if (!value) return false
        if (value.length > 11 && value.length < 14) {
          return false
        }
        return true
      }),
    phone: yup.string().required().min(10, 'Telefone inválido'),
    birthDate: yup
      .date()
      .required()
      .test('is-adult', 'Você precisar ser maior de 18 anos', value => {
        if (!value) return false
        const date = new Date(value)
        const age = getAge(date)
        return age >= 18
      })
      .test('is-invalid', 'Data inválida', value => {
        if (!value) return false
        const date = new Date(value)
        const age = getAge(date)
        return age < 100
      }),
    dependents: yup.number().required(),
    password: yup
      .string()
      .required()
      .min(8, 'Precise ter no mínimo 8 caracteres'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem'),
    address: yup.object().shape({
      zipCode: yup.string().required().min(8, 'CEP inválido'),
      street: yup.string().required(),
      city: yup.string().required(),
      district: yup.string().required(),
      additionalDetails: yup.string(),
      number: yup.string().required(),
      state: yup.string().required()
    })
  }),
  forgotPassword: yup.object().shape({
    email: yup.string().required().email()
  }),
  resetPassword: yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'As senhas não coincidem')
  })
}
