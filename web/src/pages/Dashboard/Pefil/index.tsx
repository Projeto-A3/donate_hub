import CardDonation from 'components/CardDonation'
import Inputmask from 'components/Inputmask'
import TitlePage from 'components/TitlePage'
import { useAuth } from 'contexts/auth'
import { Formik, FormikHelpers } from 'formik'
import { ICardDonation, User, UserRegister } from 'interfaces'
import React, { useEffect, useState } from 'react'
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner
} from 'react-bootstrap'
import { FaChevronDown, FaFolderOpen } from 'react-icons/fa'
import { FiChevronDown } from 'react-icons/fi'
import api from 'services/api'
import viacep from 'services/viacep'
import { ufs, unMask } from 'utils'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

type UpdateUser = Pick<UserRegister, 'phone' | 'dependents' | 'address'>

export default function Perfil() {
  const { user, updateUser } = useAuth()
  const [loadingCep, setLoadingCep] = useState(false)
  const [donations, setDonations] = useState<ICardDonation[]>([])
  const [reRender, setRerender] = useState(false)
  if (!user) return null

  const defaultValues = {
    phone: user.user.phone,
    dependents: user.user.dependents,
    address: {
      street: user.user.address.street,
      number: user.user.address.number,
      additionalDetails: user.user.address.additionalDetails,
      district: user.user.address.district,
      city: user.user.address.city,
      state: user.user.address.state,
      zipCode: user.user.address.zipCode
    }
  } as UpdateUser

  useEffect(() => {
    async function requestDonations() {
      try {
        const { data } = await api.get<ICardDonation[]>('donations')
        setDonations(data)
      } catch (error) {}
    }
    requestDonations()
  }, [reRender])

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success btn-lg mr-3',
      cancelButton: 'btn btn-danger btn-lg'
    },
    buttonsStyling: false
  })

  function deleteItem(item: ICardDonation) {
    swalWithBootstrapButtons
      .fire({
        title: 'Tem certeza que deseja excluir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar'
      })
      .then(async result => {
        if (result.isConfirmed) {
          try {
            await api.delete(`donations/${item.id}`)
            setRerender(true)
            toast.success('Excluído com sucesso!')
          } catch (error) {}
        }
      })
  }

  async function requestUpdateUser(
    values: UpdateUser,
    actions: FormikHelpers<UpdateUser>
  ) {
    actions.setSubmitting(true)
    try {
      await api.post(`user/update`, values)
      const { data } = await api.get<User>('user')
      updateUser(data)
      Swal.fire({
        title: 'Dados atualizados com sucesso',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        showCancelButton: false,
        showConfirmButton: false,
        padding: '3rem'
      })
    } catch (error) {
      console.log(error)
    }
    actions.setSubmitting(false)
  }

  return (
    <Container className="fadeIn" fluid>
      <TitlePage title="Seu perfil" />
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <span className="d-flex justify-content-between btn">
              <h5 className="font-weight-bold m-0">Editar perfil</h5>
              <FaChevronDown size={25} />
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="card-form bg-light shadow">
                <header className="mb-5 text-center text-dark">
                  <h1 className="font-weight-bold text-secundary">
                    Dados pessoais
                  </h1>
                </header>
                <Formik
                  initialValues={defaultValues}
                  onSubmit={requestUpdateUser}
                  enableReinitialize
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    values,
                    isSubmitting,
                    errors,
                    touched
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-field mb-4">
                        <label htmlFor="phone">Telefone</label>
                        <Inputmask
                          mask={
                            values.phone.length > 14
                              ? '(99) 99999-9999'
                              : '(99) 9999-99999'
                          }
                          type="tel"
                          name="phone"
                          onChange={e => unMask(e, handleChange)}
                          onBlur={handleBlur}
                          id="phone"
                          value={values.phone}
                          autoComplete="off"
                          className={
                            touched.phone && errors.phone ? 'error' : ''
                          }
                        />
                        <span className="text-danger">
                          {errors.phone && touched.phone && errors.phone}
                        </span>
                      </div>
                      <div className="form-field mb-4">
                        <label htmlFor="dependents">Dependentes</label>
                        <input
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          id="dependents"
                          value={values.dependents}
                          autoComplete="off"
                          className={
                            touched.dependents && errors.dependents
                              ? 'error'
                              : ''
                          }
                        />
                        <span className="text-danger">
                          {errors.dependents &&
                            touched.dependents &&
                            errors.dependents}
                        </span>
                      </div>
                      <h1 className="font-weight-bold text-secundary text-center">
                        Endereço
                      </h1>
                      <Row>
                        <Col lg={6}>
                          <div className="form-field mb-4">
                            <label htmlFor="zipCode">CEP</label>
                            <Inputmask
                              mask="99999-999"
                              type="tel"
                              name="address.zipCode"
                              onChange={e => unMask(e, handleChange)}
                              onBlur={async e => {
                                handleBlur(e)
                                let { value } = e.target
                                value = value.replace(/[^0-9]/g, '')
                                setLoadingCep(true)
                                try {
                                  if (value.length < 8) throw new Error()
                                  const res = await viacep(e.target.value)
                                  if (res.erro) {
                                    throw new Error()
                                  }
                                  const { logradouro, bairro, localidade, uf } =
                                    res
                                  setFieldValue('address.street', logradouro)
                                  setFieldValue('address.district', bairro)
                                  setFieldValue('address.city', localidade)
                                  setFieldValue('address.state', uf)
                                } catch (error) {}
                                setLoadingCep(false)
                              }}
                              id="zipCode"
                              value={values.address.zipCode.replace(
                                /[^0-9]/g,
                                ''
                              )}
                              autoComplete="off"
                              className={
                                touched.address?.zipCode &&
                                errors.address?.zipCode
                                  ? 'error'
                                  : ''
                              }
                            />
                            <span className="text-danger">
                              {errors.address?.zipCode &&
                                touched.address?.zipCode &&
                                errors.address?.zipCode}
                            </span>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-field mb-4">
                            <label htmlFor="street">Rua</label>
                            <input
                              type="text"
                              name="address.street"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="street"
                              value={values.address.street}
                              autoComplete="off"
                              className={
                                touched.address?.street &&
                                errors.address?.street
                                  ? 'error'
                                  : ''
                              }
                              disabled={loadingCep}
                            />

                            {loadingCep && (
                              <span className="spinner-animation">
                                <Spinner animation="border" />
                              </span>
                            )}
                            <span className="text-danger">
                              {errors.address?.street &&
                                touched.address?.street &&
                                errors.address?.street}
                            </span>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-field mb-4">
                            <label htmlFor="district">Bairro</label>
                            <input
                              type="text"
                              name="address.district"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="district"
                              value={values.address.district}
                              autoComplete="off"
                              className={
                                touched.address?.district &&
                                errors.address?.district
                                  ? 'error'
                                  : ''
                              }
                              disabled={loadingCep}
                            />
                            {loadingCep && (
                              <span className="spinner-animation">
                                <Spinner animation="border" />
                              </span>
                            )}
                            <span className="text-danger">
                              {errors.address?.district &&
                                touched.address?.district &&
                                errors.address?.district}
                            </span>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="form-field mb-4">
                            <label htmlFor="additionalDetails">
                              Complemento
                            </label>
                            <input
                              type="text"
                              name="address.additionalDetails"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="additionalDetails"
                              value={values.address.additionalDetails}
                              autoComplete="off"
                              className={
                                touched.address?.additionalDetails &&
                                errors.address?.additionalDetails
                                  ? 'error'
                                  : ''
                              }
                            />
                            <span className="text-danger">
                              {errors.address?.additionalDetails &&
                                touched.address?.additionalDetails &&
                                errors.address?.additionalDetails}
                            </span>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="form-field mb-4">
                            <label htmlFor="number">Número</label>
                            <input
                              type="tel"
                              name="address.number"
                              onChange={e => {
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ''
                                )
                                handleChange(e)
                              }}
                              onBlur={handleBlur}
                              id="number"
                              value={values.address.number}
                              autoComplete="off"
                              className={
                                touched.address?.number &&
                                errors.address?.number
                                  ? 'error'
                                  : ''
                              }
                            />
                            <span className="text-danger">
                              {errors.address?.number &&
                                touched.address?.number &&
                                errors.address?.number}
                            </span>
                          </div>
                        </Col>
                        <Col lg={5}>
                          <div className="form-field mb-4">
                            <label htmlFor="city">Cidade</label>
                            <input
                              type="text"
                              name="address.city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="city"
                              value={values.address.city}
                              autoComplete="off"
                              className={
                                touched.address?.city && errors.address?.city
                                  ? 'error'
                                  : ''
                              }
                              disabled={loadingCep}
                            />
                            {loadingCep && (
                              <span className="spinner-animation">
                                <Spinner animation="border" />
                              </span>
                            )}
                            <span className="text-danger">
                              {errors.address?.city &&
                                touched.address?.city &&
                                errors.address?.city}
                            </span>
                          </div>
                        </Col>
                        <Col lg={3}>
                          <div className="form-field mb-4">
                            <label htmlFor="state">Estado</label>
                            <select
                              name="address.state"
                              id="state"
                              value={values.address.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                touched.address?.state && errors.address?.state
                                  ? 'error'
                                  : ''
                              }
                              disabled={loadingCep}
                            >
                              <option disabled hidden></option>
                              {ufs.map((opt, index) => (
                                <option value={opt} key={index}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            {loadingCep && (
                              <span className="spinner-animation">
                                <Spinner animation="border" />
                              </span>
                            )}
                            <span className="select-arrow">
                              <FiChevronDown size={25} />
                            </span>
                            <span className="text-danger">
                              {errors.address?.state &&
                                touched.address?.state &&
                                errors.address?.state}
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <div className="my-2 text-center">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          variant="secundary"
                          size="lg"
                        >
                          {isSubmitting ? (
                            <span className="d-flex justify-content-between align-items-center">
                              Salvando
                              <Spinner
                                animation="border"
                                variant="dark"
                                className="ml-2"
                              />
                            </span>
                          ) : (
                            'Salvar'
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {user.user.type.includes('doador') ? (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <span className="d-flex justify-content-between btn">
                <h5 className="font-weight-bold m-0">Contribuições feitas</h5>
                <FaChevronDown size={25} />
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Row>
                  {donations.length ? (
                    donations.map(item => {
                      return (
                        <Col lg={3} key={item.id}>
                          <CardDonation
                            description={item.description}
                            title={item.title}
                            status={item.status}
                            donee={item.donee}
                            donor={item.donor}
                            createdAt={item.createdAt}
                          />
                        </Col>
                      )
                    })
                  ) : (
                    <Col>
                      <div className="text-center text-secundary my-5">
                        <h1 className="font-weight-bold">
                          Nenhuma doação feita
                        </h1>
                        <FaFolderOpen size={50} />
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ) : (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <span className="d-flex justify-content-between btn">
                <h5 className="font-weight-bold m-0">Pedidos de doação</h5>
                <FaChevronDown size={25} />
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <Row>
                  {donations.length ? (
                    donations.map(item => {
                      return (
                        <Col lg={3} key={item.id}>
                          <CardDonation
                            description={item.description}
                            title={item.title}
                            status={item.status}
                            donee={item.donee}
                            createdAt={item.createdAt}
                          >
                            <div className="text-center mt-4">
                              <button
                                type="button"
                                className="btn btn-danger btn-lg"
                                onClick={() => deleteItem(item)}
                              >
                                Excluir
                              </button>
                            </div>
                          </CardDonation>
                        </Col>
                      )
                    })
                  ) : (
                    <Col>
                      <div className="text-center text-secundary my-5">
                        <h1 className="font-weight-bold">
                          Nenhuma pedido de doação feito
                        </h1>
                        <FaFolderOpen size={50} />
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        )}
      </Accordion>
    </Container>
  )
}
