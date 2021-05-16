import { useAuth } from 'contexts/auth'
import React, { useEffect } from 'react'
import api from 'services/api'

const DashboardHome: React.FC = () => {
  const { user } = useAuth()

  useEffect(() => {
    api
      .get('donations', {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      })

      .then(({ data }) => console.log(data))
  }, [])

  return (
    <div className="container">
      <div>{user?.user.name}</div>
    </div>
  )
}

export default DashboardHome
