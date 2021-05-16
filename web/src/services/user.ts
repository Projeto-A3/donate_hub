import { User, UserLogin, UserRegister } from 'interfaces'
import api from './api'

export const signIn = async (credentials: UserLogin) => {
  const { data: user } = await api.post<User>('login', credentials)
  return user
}

export const signUp = async (dados: UserRegister) => {
  const { data: user } = await api.post<User>('user', dados)
  return user
}
