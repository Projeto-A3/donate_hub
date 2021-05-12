import React, { useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FiChevronDown, FiEye, FiEyeOff } from 'react-icons/fi'
import { Formik, FormikHelpers } from 'formik'
import { UserRegister } from 'interfaces'
import { ufs } from 'utils'

const user: UserRegister = {
  name: '',
  email: '',
  surname: '',
  password: '',
  birthDate: '',
  cpf_cnpj: '',
  dependents: 0,
  phone: '',
  type: '',
  address: {
    street: '',
    number: '',
    additionalDetails: '',
    district: '',
    city: '',
    state: '',
    zipCode: ''
  }
}

const Cadastrar = () => {
  const [isLegal, setIsLegal] = useState(false)
  const [showPassoword, setShowPassword] = useState(false)

  function handlerRegister(
    value: UserRegister,
    actions: FormikHelpers<UserRegister>
  ) {
    console.log(value)
    actions.setSubmitting(true)
    setTimeout(() => {
      actions.setSubmitting(false)
    }, 5000)
  }
  return (
    <section className="page-default page-cadastrar fadeIn">
      <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
            <div className="card-form shadow my-5">
              <header className="mb-5 text-center text-dark">
                <h1 className="font-weight-bold text-secundary">Cadastrar</h1>
              </header>
              <Formik
                initialValues={user}
                onSubmit={handlerRegister}
                enableReinitialize
              >
                {({
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  values,
                  isSubmitting,
                  errors,
                  touched
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="name">Nome</label>
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="name"
                            value={values.name}
                            autoComplete="off"
                            className={
                              touched.name && errors.name ? 'error' : ''
                            }
                          />
                          <span className="text-danger">
                            {errors.name && touched.name && errors.name}
                          </span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="surname">Sobrenome</label>
                          <input
                            type="text"
                            name="surname"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="surname"
                            value={values.surname}
                            autoComplete="off"
                            className={
                              touched.surname && errors.surname ? 'error' : ''
                            }
                          />
                          <span className="text-danger">
                            {errors.surname &&
                              touched.surname &&
                              errors.surname}
                          </span>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <div className="form-field mb-4">
                          <label htmlFor="email">E-mail</label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="email"
                            value={values.email}
                            autoComplete="off"
                            className={
                              touched.email && errors.email ? 'error' : ''
                            }
                          />
                          <span className="text-danger">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="cpf_cnpj">
                            {isLegal ? 'CNPJ' : 'CPF'}
                          </label>
                          <input
                            type="tel"
                            name="cpf_cnpj"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="cpf_cnpj"
                            value={values.cpf_cnpj}
                            autoComplete="off"
                            className={
                              touched.cpf_cnpj && errors.cpf_cnpj ? 'error' : ''
                            }
                          />
                          <div className="d-flex align-items-center mt-2">
                            <input
                              type="checkbox"
                              name="isLegal"
                              id="isLegal"
                              onChange={() => setIsLegal(!isLegal)}
                            />
                            <label htmlFor="isLegal">Pessoa Jurídica</label>
                          </div>
                          <span className="text-danger">
                            {errors.cpf_cnpj &&
                              touched.cpf_cnpj &&
                              errors.cpf_cnpj}
                          </span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="phone">Telefone</label>
                          <input
                            type="tel"
                            name="phone"
                            onChange={handleChange}
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
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="birthDate">Data de Nascimento</label>
                          <input
                            type="date"
                            name="birthDate"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="birthDate"
                            value={values.birthDate}
                            autoComplete="off"
                            className={
                              touched.birthDate && errors.birthDate
                                ? 'error'
                                : ''
                            }
                          />
                          <span className="text-danger">
                            {errors.birthDate &&
                              touched.birthDate &&
                              errors.birthDate}
                          </span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="dependents">Dependentes</label>
                          <input
                            type="number"
                            name="dependents"
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
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="password">Senha</label>
                          <input
                            type={showPassoword ? 'text' : 'password'}
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="password"
                            value={values.password}
                            autoComplete="off"
                            className={
                              touched.password && errors.password ? 'error' : ''
                            }
                          />
                          <button
                            type="button"
                            className="show-password"
                            onClick={() => setShowPassword(!showPassoword)}
                          >
                            {showPassoword ? (
                              <FiEyeOff size={25} />
                            ) : (
                              <FiEye size={25} />
                            )}
                          </button>
                          <span className="text-danger">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="repeat-password">Repetir Senha</label>
                          <input
                            type={showPassoword ? 'text' : 'password'}
                            name="repeat-password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="repeat-password"
                            autoComplete="off"
                          />
                          <button
                            type="button"
                            className="show-password"
                            onClick={() => setShowPassword(!showPassoword)}
                          >
                            {showPassoword ? (
                              <FiEyeOff size={25} />
                            ) : (
                              <FiEye size={25} />
                            )}
                          </button>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <h2 className="font-weight-bold text-secundary my-4">
                          Endereço
                        </h2>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="zipCode">CEP</label>
                          <input
                            type="tel"
                            name="address.zipCode"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="zipCode"
                            value={values.address.zipCode}
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
                              touched.address?.street && errors.address?.street
                                ? 'error'
                                : ''
                            }
                          />
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
                          />
                          <span className="text-danger">
                            {errors.address?.district &&
                              touched.address?.district &&
                              errors.address?.district}
                          </span>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="form-field mb-4">
                          <label htmlFor="additionalDetails">Complemento</label>
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="number"
                            value={values.address.number}
                            autoComplete="off"
                            className={
                              touched.address?.number && errors.address?.number
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
                          />
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
                          >
                            <option disabled hidden></option>
                            {ufs.map((opt, index) => (
                              <option value={opt} key={index}>
                                {opt}
                              </option>
                            ))}
                          </select>
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
                    <div className="text-center mt-5">
                      <button
                        className="theme-button secundary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="d-flex justify-content-between align-items-center">
                            Cadastrando
                            <Spinner
                              animation="border"
                              variant="dark"
                              className="ml-2"
                            />
                          </span>
                        ) : (
                          'Cadastrar'
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Cadastrar
