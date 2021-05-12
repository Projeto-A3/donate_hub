import axios from 'axios'
import { Viacep } from 'interfaces'

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

export const cep = async (value: string) => {
  try {
    const { data }: { data: Viacep } = await axios.get(
      `https://viacep.com.br/ws/${value.replace(/[^0-9]/g, '')}/json/`
    )
    return data
  } catch (error) {
    return {
      error: true
    }
  }
}
