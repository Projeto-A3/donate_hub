import TitlePage from 'components/TitlePage'
import { useAdminContext } from 'contexts/admin'
import { AdminListUser } from 'interfaces'
import React, { useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { FaFolderOpen } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { formatDate } from 'utils'

export default function Users() {
  const { users } = useAdminContext()

  const [listUsers, setListUsers] = useState(users)

  function filterTable(e: React.ChangeEvent<HTMLInputElement>) {
    let { value } = e.target
    value = value.toLowerCase()
    setListUsers(
      users.filter(({ name, surname, email, phone, type }) => {
        return (
          name.toLowerCase().includes(value) ||
          surname.toLowerCase().includes(value) ||
          email.toLowerCase().includes(value) ||
          phone.toLowerCase().includes(value) ||
          type.toLowerCase().includes(value)
        )
      })
    )
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

  function handleModal(user: AdminListUser) {
    swalWithBootstrapButtons.fire({
      title: `<strong>Usuário ${user.name}</strong>`,
      icon: 'info',
      width: 700,
      html: `
        <span class="d-block"><strong>Nome:</strong> ${user.name}</span>
        <span class="d-block"><strong>Sobrenome:</strong> ${user.surname}</span>
        <span class="d-block"><strong>E-mail:</strong> ${user.email}</span>
        <span class="d-block"><strong>Telefone:</strong> ${maskPhone(
          user.phone
        )}</span>
        <span class="d-block"><strong>Tipo de usuário:</strong> ${
          user.type.includes('doador') ? 'Doador' : 'Donatário'
        }</span>
        <span class="d-block"><strong>Data de nascimento:</strong> ${formatDate(
          user.birthDate
        )}</span>
        <span class="d-block"><strong>Dependentes:</strong> ${
          user.dependents
        }</span>
        <h3 class="mt-5 font-weight-bold">
          Endereço
        </h3>
        <div class="d-block">
          <span class="d-block"><strong>CEP:</strong> ${user.address.zipCode.replace(
            /(\d{5})(\d*)/g,
            '$1-$2'
          )}</span>
          <span class="d-block">
            <strong>Cidade:</strong> ${user.address.city}, ${user.address.state}
          </span>
          <span class="d-block">
            <strong>Rua:</strong> ${user.address.street}
          </span>
          <span class="d-block">
            <strong>Bairro:</strong> ${user.address.district}
          </span>
          <span class="d-block">
            <strong>Número:</strong> ${user.address.number}
          </span>
          ${
            user.address.additionalDetails
              ? `
              <span class="d-block">
                <strong>Complemento:</strong> ${user.address.additionalDetails}
              </span>
            `
              : ''
          }
        </div>
      `
    })
  }

  return (
    <Container className="fadeIn" fluid>
      <TitlePage title="Lista de usuários" />
      <Row className="justify-content-end">
        <Col lg={3}>
          <div className="form-group">
            <label htmlFor="search">
              <strong>Buscar</strong>
            </label>
            <input
              type="search"
              id="search"
              className="form-control form-control-lg"
              onChange={filterTable}
            />
          </div>
        </Col>
      </Row>
      {listUsers.length ? (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Primeiro nome</th>
              <th>Sobrenome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Tipo</th>
              <th>Data de cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listUsers.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.surname}</td>
                  <td>{item.email}</td>
                  <td>{maskPhone(item.phone)}</td>
                  <td>
                    {item.type.includes('doador') ? 'Doador' : 'Donatário'}
                  </td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td>
                    <Button variant="info" onClick={() => handleModal(item)}>
                      Ver mais dados
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      ) : (
        <div className="text-center text-secundary mt-5">
          <h1 className="font-weight-bold">Nenhum resultado encontrado</h1>
          <FaFolderOpen size={80} />
        </div>
      )}
    </Container>
  )
}
