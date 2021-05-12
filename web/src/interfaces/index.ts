export interface Login {
  email: string
  password: string
}

interface Address {
  street: string
  number: string
  additionalDetails?: string
  district: string
  city: string
  state: string
  zipCode: string
}

export interface UserRegister {
  type: string
  name: string
  surname: string
  email: string
  password: string
  cpf_cnpj: string
  phone: string
  birthDate: string
  dependents: number
  address: Address
}

export interface Viacep {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
  erro?: boolean
}
