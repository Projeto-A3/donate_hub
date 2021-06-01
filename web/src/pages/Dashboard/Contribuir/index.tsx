import React, { useEffect, useState } from 'react'
import CardDonation from 'components/CardDonation'
import SkeletonAnimation from 'components/CardDonation/SkeletonAnimation'
import { useAuth } from 'contexts/auth'
import { ICardDonation } from 'interfaces'
import { Col, Container, Row } from 'react-bootstrap'
import api from 'services/api'
import { FaFolderOpen } from 'react-icons/fa'
import TitlePage from 'components/TitlePage'

export default function Contribuir() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState<ICardDonation[]>([])

  useEffect(() => {
    async function listAll() {
      try {
        const {
          data: { data }
        } = await api.get<{ data: ICardDonation[] }>('donations/all')
        setDonations(data)
      } catch (error) {}
      setLoading(false)
    }

    listAll()
  }, [])

  if (!user) return null

  return (
    <Container
      className={`fadeIn ${
        !donations.length
          ? 'd-flex flex-column justify-content-between h-100'
          : ''
      }`}
      fluid
    >
      <TitlePage title="Doações disponíveis" />
      {!donations.length && (
        <div className="text-center text-secundary">
          <h2 className="text-primary font-weight-bold mb-4">
            Nenhum pedido de ajudo em aberto
          </h2>
          <FaFolderOpen size={80} />
        </div>
      )}
      <Row>
        {loading
          ? Array.from(new Array(7).keys()).map(item => (
              <Col key={item} lg={4}>
                <SkeletonAnimation />
              </Col>
            ))
          : donations.map(item => (
              <Col lg={4} key={item.id}>
                <div className="mb-3">
                  <CardDonation
                    donee={item.donee}
                    title={item.title}
                    description={item.description}
                    status={item.status}
                  />
                </div>
              </Col>
            ))}
      </Row>
    </Container>
  )
}
