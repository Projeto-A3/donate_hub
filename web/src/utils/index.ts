import { ChangeEvent } from 'react'

export const ufs = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]

export function unMask<T extends ChangeEvent<HTMLInputElement>>(
  e: T,
  handleChange: (e: T) => void
) {
  e.target.value = e.target.value.replace(/[^0-9]/g, '')
  handleChange(e)
}

export function isValidCPF(cpf: string) {
  if (typeof cpf !== 'string') return false
  cpf = cpf.replace(/[\s.-]*/gim, '')
  if (
    !cpf ||
    cpf.length !== 11 ||
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false
  }
  let soma = 0
  let resto
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(9, 10))) return false
  soma = 0
  for (let i = 1; i <= 10; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf.substring(10, 11))) return false
  return true
}

export function getAge(birthDate: Date) {
  const year = birthDate.getFullYear()
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1

  const date = new Date()
  const current_day = date.getDate()
  const current_month = date.getMonth() + 1
  const current_year = date.getFullYear()

  let calc_years = current_year - year

  if (current_month < month || (current_month === month && current_day < day)) {
    calc_years--
  }
  return calc_years < 0 ? 0 : calc_years
}

export function formatDate(date: string | undefined) {
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()
  if (!date) {
    return 'Data inválida'
  }
  return new Date(date).toLocaleDateString()
}
