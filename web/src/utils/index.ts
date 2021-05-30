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
