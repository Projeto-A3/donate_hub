import CardDonation from 'components/CardDonation'
import TitlePage from 'components/TitlePage'
import { useAdminContext } from 'contexts/admin'
import { ICardDonation } from 'interfaces'
import React, { useEffect, useState } from 'react'
import { Accordion, Card, Col, Container, Row } from 'react-bootstrap'
import { FaChevronDown, FaFolderOpen } from 'react-icons/fa'
import api from 'services/api'
import Swal from 'sweetalert2'

interface PropsSwalMessage {
  isError?: boolean
  msgError?: string
  isSuccess?: boolean
  msgSuccess?: string
}

export default function Donates() {
  const [listActives, setListActives] = useState<ICardDonation[]>([])
  const [listInactives, setListInactives] = useState<ICardDonation[]>([])
  const [listResolved, setListResolved] = useState<ICardDonation[]>([])
  const { donations, fnUpdateDonations } = useAdminContext()

  useEffect(() => {
    setListActives(donations.filter(({ status }) => status === 1))
    setListInactives(donations.filter(({ status }) => status === 0))
    setListResolved(donations.filter(({ status }) => status === 2))
  }, [donations])

  async function swalMessage(item: PropsSwalMessage) {
    if (item.isError) {
      await Swal.fire({
        title: item.msgError || 'Error',
        icon: 'error',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        padding: '3rem'
      })
    }
    if (item.isSuccess) {
      await Swal.fire({
        title: item.msgSuccess || 'sucesso!',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
        padding: '3rem'
      })
    }
  }

  async function setActive(id: number | undefined) {
    try {
      await api.post(`admin/approve/${id}`, { status: 1 })
      await swalMessage({ isSuccess: true, msgSuccess: 'Ativado com sucesso!' })
      fnUpdateDonations()
    } catch (error) {
      await swalMessage({
        isError: true,
        msgError: 'Não foi possível ativar o pedido'
      })
    }
  }

  async function setDisable(id: number | undefined) {
    try {
      await api.post(`admin/approve/${id}`, { status: 0 })
      await swalMessage({
        isSuccess: true,
        msgSuccess: 'Desativado com sucesso!'
      })
      fnUpdateDonations()
    } catch (error) {
      await swalMessage({
        isError: true,
        msgError: 'Não foi possível desativar o pedido'
      })
    }
  }

  async function setResolved(id: number | undefined) {
    try {
      await api.post(`admin/approve/${id}`, { status: 2 })
      await swalMessage({
        isSuccess: true,
        msgSuccess: 'Resolvido com sucesso!'
      })
      fnUpdateDonations()
    } catch (error) {
      await swalMessage({
        isError: true,
        msgError: 'Não foi possível resolver o pedido'
      })
    }
  }

  function maskPhone(phone: string) {
    return phone.replace(
      phone.length > 10 ? /(\d{2})(\d{5})(\d*)/ : /(\d{2})(\d{4})(\d*)/,
      '($1) $2-$3'
    )
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success btn-lg'
    },
    buttonsStyling: false
  })
  function details(item: ICardDonation) {
    swalWithBootstrapButtons.fire({
      title: `<strong>${item.title}</strong>`,
      icon: 'info',
      width: 700,
      html: `
        <p class="mb-1">
          <strong>Descrição: </strong> ${item.description}
        </p>
        <p class="mb-1">
          <strong>Status: </strong> ${
            item.status === 0
              ? 'Inativo'
              : item.status === 1
              ? 'Ativo'
              : 'Resolvido'
          }
        </p>
        ${
          item.donee
            ? `
            <h5 class="mt-4 font-weight-bold">Dados do donatário</h5>
            <p class="mb-1">
              <strong>Nome: </strong>${item.donee.name}
            </p>
            <p class="mb-1">
              <strong>Telefone: </strong> ${maskPhone(item.donee.phone)}
            </p>
            <p class="mb-1">
              <strong>E-mail: </strong> ${item.donee.email}
            </p>
          `
            : ''
        }
        ${
          item.donor
            ? `
            <h5 class="mt-4 font-weight-bold">Dados do doador</h5>
            <p class="mb-1">
              <strong>Nome: </strong>${item.donor.name}
            </p>
            <p class="mb-1">
              <strong>Telefone: </strong> ${maskPhone(item.donor.phone)}
            </p>
            <p class="mb-1">
              <strong>E-mail: </strong> ${item.donor.email}
            </p>
          `
            : ''
        }
      `
    })
  }

  return (
    <Container className="fadeIn" fluid>
      <TitlePage title="Lista de doações" />
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            className="btn"
            eventKey="0"
          >
            <h4 className="text-secundary d-flex justify-content-between text-left font-weight-bold m-0">
              Lista de inativos
              <FaChevronDown />
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {!listInactives.length && (
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <p className="h3 font-weight-bold text-primary">
                    Nenhum pedido resolvido
                  </p>
                  <span className="text-secundary">
                    <FaFolderOpen size={80} />
                  </span>
                </div>
              )}
              <Row>
                {listInactives.map(item => {
                  return (
                    <Col key={item.id} lg={4}>
                      <div className="mb-2">
                        <CardDonation
                          id={item.id}
                          description={item.description}
                          status={item.status}
                          title={item.title}
                          donee={item.donee}
                          select={setActive}
                          textButton="Ativar"
                        >
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-block"
                              onClick={() => setResolved(item.id)}
                            >
                              Resolver
                            </button>
                          </div>
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              className="btn btn-dark btn-block"
                              onClick={() => details(item)}
                            >
                              Detalhes
                            </button>
                          </div>
                        </CardDonation>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            className="btn"
            eventKey="1"
          >
            <h4 className="text-secundary d-flex justify-content-between text-left font-weight-bold m-0">
              Lista de ativos
              <FaChevronDown />
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {!listActives.length && (
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <p className="h3 font-weight-bold text-primary">
                    Nenhum pedido ativo
                  </p>
                  <span className="text-secundary">
                    <FaFolderOpen size={80} />
                  </span>
                </div>
              )}
              <Row>
                {listActives.map(item => {
                  return (
                    <Col key={item.id} lg={4}>
                      <div className="mb-2">
                        <CardDonation
                          id={item.id}
                          description={item.description}
                          status={item.status}
                          title={item.title}
                          donee={item.donee}
                          select={setDisable}
                          textButton="Desativar"
                        >
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-block"
                              onClick={() => setResolved(item.id)}
                            >
                              Resolver
                            </button>
                          </div>
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              className="btn btn-dark btn-block"
                              onClick={() => details(item)}
                            >
                              Detalhes
                            </button>
                          </div>
                        </CardDonation>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            variant="link"
            className="btn"
            eventKey="2"
          >
            <h4 className="text-secundary d-flex justify-content-between text-left font-weight-bold m-0">
              Lista de resolvidos
              <FaChevronDown />
            </h4>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {!listResolved.length && (
                <div className="d-flex justify-content-center align-items-center flex-column">
                  <p className="h3 font-weight-bold text-primary">
                    Nenhum pedido resolvido
                  </p>
                  <span className="text-secundary">
                    <FaFolderOpen size={80} />
                  </span>
                </div>
              )}
              <Row>
                {listResolved.map(item => {
                  return (
                    <Col key={item.id} lg={4}>
                      <div className="mb-2">
                        <CardDonation
                          id={item.id}
                          description={item.description}
                          status={item.status}
                          title={item.title}
                          donee={item.donee}
                          select={setActive}
                          textButton="Ativar"
                        >
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              className="btn btn-primary btn-block"
                              onClick={() => setDisable(item.id)}
                            >
                              Desativar
                            </button>
                          </div>
                          <div className="text-center mt-2">
                            <button
                              type="button"
                              className="btn btn-dark btn-block"
                              onClick={() => details(item)}
                            >
                              Detalhes
                            </button>
                          </div>
                        </CardDonation>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  )
}
