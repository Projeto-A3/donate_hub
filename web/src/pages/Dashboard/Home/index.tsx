import React, { useEffect } from 'react'
import { useAuth } from 'contexts/auth'
import { Container } from 'react-bootstrap'
import api from 'services/api'
import TitlePage from 'components/TitlePage'

export default function DashboardHome() {
  const { user } = useAuth()

  if (!user) return null

  useEffect(() => {
    api.get('/user').then(res => {
      console.log(res)
    })
  }, [])

  return (
    <Container className="fadeIn" fluid>
      <TitlePage title={`Bem vindo, ${user.user.name}`} />
    </Container>
  )
}
