import { UserAdmin, UserAdminLogin } from 'interfaces'
import api from './api'

export const signIn = async (credentials: UserAdminLogin) => {
  const { data: user } = await api.post<UserAdmin>('admin/login', credentials)
  return user
}
