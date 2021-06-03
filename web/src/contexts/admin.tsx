import { ICardDonation, AdminListUser } from 'interfaces'
import React, { createContext, useContext, useEffect, useState } from 'react'
import api from 'services/api'

interface IAdminContextData {
  fnUpdateDonations(): void
  donations: ICardDonation[]
  users: AdminListUser[]
}

const AdminContext = createContext<IAdminContextData>({} as IAdminContextData)

export const AdminProvider: React.FC = ({ children }) => {
  const [listDonations, setListDonations] = useState<ICardDonation[]>([])
  const [listUsers, setListUsers] = useState<AdminListUser[]>([])
  const [loading, setLoading] = useState(true)

  async function requestDonations() {
    try {
      const { data } = await api.get<ICardDonation[]>('admin/listDonates')
      setListDonations(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async function requestUsers() {
    try {
      const { data } = await api.get<AdminListUser[]>('admin/listUsers')
      setListUsers(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  useEffect(() => {
    async function requestLoad() {
      await requestDonations()
      await requestUsers()
    }
    requestLoad()
    setLoading(false)
  }, [])

  async function fnUpdateDonations() {
    setLoading(true)
    await requestDonations()
    setLoading(false)
  }

  if (loading) {
    return null
  }

  return (
    <AdminContext.Provider
      value={{
        users: listUsers,
        donations: listDonations,
        fnUpdateDonations
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  const data = useContext(AdminContext)
  return data
}
