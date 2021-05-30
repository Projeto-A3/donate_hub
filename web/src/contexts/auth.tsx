import { UserRegister, UserLogin, User } from 'interfaces'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import * as userApi from '../services/user'

interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  updateLoading(value: boolean): void
  signIn(credentials: UserLogin): Promise<void>
  signUp(dados: UserRegister): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const storageNames = {
    user: '@donate-hub:user',
    token: '@donate-hub:token'
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem(storageNames.user)
    const storagedToken = localStorage.getItem(storageNames.token)
    if (storagedUser && storagedToken) {
      setUser({ user: JSON.parse(storagedUser), token: storagedToken })
    }
    setLoading(false)
  }, [])

  async function signIn(credentials: UserLogin) {
    const response = await userApi.signIn(credentials)
    setUser(response)
    localStorage.setItem(storageNames.user, JSON.stringify(response.user))
    localStorage.setItem(storageNames.token, response.token)
    history.push('/dashboard')
  }
  async function signUp(dados: UserRegister) {
    const resUser = await userApi.signUp(dados)
    setUser(resUser)
    localStorage.setItem(storageNames.user, JSON.stringify(resUser.user))
    localStorage.setItem(storageNames.token, resUser.token)
    history.push('/dashboard')
  }

  function signOut() {
    localStorage.removeItem(storageNames.user)
    localStorage.removeItem(storageNames.token)
    setUser(null)
    history.push('/')
  }

  function updateLoading(value: boolean) {
    setLoading(value)
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        updateLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}
