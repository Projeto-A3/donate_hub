import React, { useEffect, useState } from 'react'
import CardDonation from 'components/CardDonation'
import SkeletonAnimation from 'components/CardDonation/SkeletonAnimation'
import { useAuth } from 'contexts/auth'
import { ICardDonation } from 'interfaces'
import { Col, Container, Row } from 'react-bootstrap'

export default function Contribuir() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  const list: ICardDonation[] = [
    {
      id: 0,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    },
    {
      id: 1,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    },
    {
      id: 2,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    },
    {
      id: 3,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    },
    {
      id: 4,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    },
    {
      id: 5,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    },
    {
      id: 6,
      title: 'Lorem Ipsum é simplesmente uma',
      description:
        'Lorem Ipsum é simplesmente uma simulação e de impressos, e vem sendo utilizado desde  desconhecido pegou uma bandeja de tipos e  modelos de tipos. Lorem Ipsum sobreviveu não',
      status: false
    }
  ]

  if (!user) return null

  return (
    <Container className="fadeIn" fluid>
      <h1 className="font-weight-bold text-secundary">
        Bem vindo, {user.user.name}
      </h1>
      {user.user.type}
      <Row>
        {loading
          ? Array.from(new Array(7).keys()).map(item => (
              <Col key={item} lg={4}>
                <SkeletonAnimation />
              </Col>
            ))
          : list.map(item => (
              <Col lg={4} key={item.id}>
                <div className="mb-3">
                  <CardDonation
                    editor={true}
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
