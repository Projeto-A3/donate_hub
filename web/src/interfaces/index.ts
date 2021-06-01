export interface UserLogin {
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

export interface User {
  user: Omit<UserRegister, 'password'> & {
    id: string
    createdAt: string
    updatedAt: string
  }
  token: string
}

export interface Viacep {
  bairro: string
  complemento: string
  localidade: string
  logradouro: string
  uf: string
  erro?: boolean
}

export interface ICardDonation {
  id?: number
  title: string
  description: string
  status: number
  donee: Pick<UserRegister, 'email' | 'phone' | 'name'>
}

export interface IUserAdminRegister {
  name: string
  surname: string
  email: string
  password: string
  type: string
}

export interface UserAdmin {
  user: Omit<IUserAdminRegister, 'password'>
  token: string
}
export type UserAdminLogin = Pick<IUserAdminRegister, 'email' | 'password'>

export type RegisterDonation = Omit<ICardDonation, 'donee' | 'status' | 'id'>
