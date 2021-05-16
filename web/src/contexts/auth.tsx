import { UserRegister, UserLogin, User } from 'interfaces'
import React, { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router'
import * as userApi from '../services/user'

interface AuthContextData {
  signed: boolean
  user: User | null
  signIn(credentials: UserLogin): Promise<void>
  signUp(dados: UserRegister): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory()
  const [user, setUser] = useState<User | null>(null)
  async function signIn(credentials: UserLogin) {
    const response = await userApi.signIn(credentials)
    setUser(response)
    history.push('/dashboard')
  }
  async function signUp(dados: UserRegister) {
    const resUser = await userApi.signUp(dados)
    setUser(resUser)
    history.push('/dashboard')
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
