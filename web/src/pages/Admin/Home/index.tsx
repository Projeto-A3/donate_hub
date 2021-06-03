import TitlePage from 'components/TitlePage'
import { useAuth } from 'contexts/auth'
import { AdminListDonations, AdminListUser } from 'interfaces'
import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FiUser, FiCheckCircle } from 'react-icons/fi'
import { GiHeartPlus } from 'react-icons/gi'
import api from 'services/api'
import { PieChart } from 'react-minimal-pie-chart'
import Loading from 'components/Loading'

export default function Home() {
  const { userAdmin } = useAuth()
  const [loading, setLading] = useState(false)

  const [listData, setListData] = useState({
    usersDonee: 0,
    usersDonor: 0,
    donatesActive: 0,
    donatesInactive: 0,
    donatesResolved: 0
  })

  useEffect(() => {
    async function handleListUsers() {
      setLading(true)
      try {
        const { data: dataUser } = await api.get<AdminListUser[]>(
          'admin/listUsers'
        )
        const { data: DataDonates } = await api.get<AdminListDonations[]>(
          'admin/listDonates'
        )

        setListData({
          usersDonor: dataUser.filter(({ type }) => type.includes('doador'))
            .length,
          usersDonee: dataUser.filter(({ type }) => type.includes('donatario'))
            .length,
          donatesActive: DataDonates.filter(({ status }) => status === 1)
            .length,
          donatesInactive: DataDonates.filter(({ status }) => status === 0)
            .length,
          donatesResolved: DataDonates.filter(({ status }) => status === 2)
            .length
        })
      } catch (error) {
        console.log(error)
      }
      setLading(false)
    }
    handleListUsers()
  }, [])

  if (!userAdmin) return null

  if (loading) {
    return <Loading />
  }

  return (
    <Container className="admin-home-page" fluid>
      <TitlePage title={`Bem vindo, ${userAdmin.user.name}`} />
      <Row>
        <Col lg={3}>
          <div className="box shadow rounded bg-1">
            <div className="text-white">
              <strong className="h3">{listData.usersDonor}</strong>
              <p className="mt-1 h5 font-weight-bold">Total de Doadores</p>
            </div>
            <FiUser size={50} color="#fff" />
          </div>
        </Col>
        <Col lg={3}>
          <div className="box shadow rounded bg-2">
            <div className="text-white">
              <strong className="h3">{listData.usersDonee}</strong>
              <p className="mt-1 h5 font-weight-bold">Total de Donatários</p>
            </div>
            <FiUser size={50} color="#fff" />
          </div>
        </Col>
        <Col lg={3}>
          <div className="box shadow rounded bg-3">
            <div className="text-white">
              <strong className="h3">{listData.donatesActive}</strong>
              <p className="mt-1 h5 font-weight-bold">Pedidos Ativos</p>
            </div>
            <GiHeartPlus size={50} color="#fff" />
          </div>
        </Col>
        <Col lg={3}>
          <div className="box shadow rounded bg-4">
            <div className="text-white">
              <strong className="h3">{listData.donatesInactive}</strong>
              <p className="mt-1 h5 font-weight-bold">Pedidos Inativos</p>
            </div>
            <FiUser size={50} color="#fff" />
          </div>
        </Col>
        <Col lg={3}>
          <div className="box shadow rounded bg-5">
            <div className="text-white">
              <strong className="h3">{listData.donatesResolved}</strong>
              <p className="mt-1 h5 font-weight-bold">Pedidos Resolvidos</p>
            </div>
            <FiCheckCircle size={50} color="#fff" />
          </div>
        </Col>
      </Row>
      <h1 className="text-secundary font-weight-bold my-5">
        Estatísticas da plataforma
      </h1>
      <div className="mt-5">
        <Row className="justify-content-center">
          <Col lg={4}>
            <Card className="shadow">
              <Card.Header as="strong">
                Proporção Doadores x Donatários
              </Card.Header>
              <Card.Body>
                <PieChart
                  label={({ x, y, dx, dy, dataEntry }) => (
                    <text
                      key={dataEntry.id}
                      x={x}
                      y={y}
                      dx={dx}
                      dy={dy}
                      dominantBaseline="central"
                      textAnchor="middle"
                      style={{
                        fontSize: '10px',
                        fill: '#fff'
                      }}
                    >
                      {Math.round(dataEntry.percentage) + '%'}
                    </text>
                  )}
                  labelStyle={{
                    fontSize: 12
                  }}
                  data={[
                    {
                      id: 1,
                      title: 'Doadores',
                      value: listData.usersDonor,
                      color: '#d96666'
                    },
                    {
                      id: 2,
                      title: 'Donatários',
                      value: listData.usersDonee,
                      color: '#345b73'
                    }
                  ]}
                />
                <small>Legenda</small>
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      display: 'block',
                      background: '#d96666',
                      marginRight: 5
                    }}
                  ></span>
                  Doadores
                </div>
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      display: 'block',
                      background: '#345b73',
                      marginRight: 5
                    }}
                  ></span>
                  Donatários
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} className="offset-lg-1">
            <Card className="shadow">
              <Card.Header as="strong">
                Proporção de pedidos Ativos x Inativos x Resolvidos
              </Card.Header>
              <Card.Body>
                <PieChart
                  label={({ x, y, dx, dy, dataEntry }) => (
                    <text
                      key={dataEntry.id}
                      x={x}
                      y={y}
                      dx={dx}
                      dy={dy}
                      dominantBaseline="central"
                      textAnchor="middle"
                      style={{
                        fontSize: '10px',
                        fill: '#fff'
                      }}
                    >
                      {Math.round(dataEntry.percentage) + '%'}
                    </text>
                  )}
                  labelStyle={{
                    fontSize: 12
                  }}
                  data={[
                    {
                      id: 1,
                      title: 'Ativos',
                      value: listData.donatesActive,
                      color: '#262626'
                    },
                    {
                      id: 2,
                      title: 'Inativos',
                      value: listData.donatesInactive,
                      color: '#bbe2f2'
                    },
                    {
                      id: 3,
                      title: 'Resolvidos',
                      value: listData.donatesResolved,
                      color: '#10ad7a'
                    }
                  ]}
                />
                <small>Legenda</small>
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      display: 'block',
                      background: '#262626',
                      marginRight: 5
                    }}
                  ></span>
                  Ativos
                </div>
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      display: 'block',
                      background: '#bbe2f2',
                      marginRight: 5
                    }}
                  ></span>
                  Inativos
                </div>
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      display: 'block',
                      background: '#10ad7a',
                      marginRight: 5
                    }}
                  ></span>
                  Resolvidos
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
