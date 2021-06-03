import { Formik, FormikHelpers } from 'formik'
import { UserLogin } from 'interfaces'
import React, { useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import schemas from 'schemas/utils'
import api from 'services/api'

interface IForgotPassword extends UserLogin {
  passwordConfirmation: string
}

export default function RecuperarSenha() {
  const params = useParams<{ token: string }>()
  const [showPassoword, setShowPassword] = useState(false)

  async function forgotPassword(
    value: IForgotPassword,
    actions: FormikHelpers<IForgotPassword>
  ) {
    actions.setSubmitting(true)
    try {
      const { email, password } = value
      const data = {
        url: params.token ? 'resetPassword' : 'forgotPassword',
        payload: params.token
          ? {
              email,
              password,
              token: params.token
            }
          : {
              email
            }
      }
      const {
        data: { message }
      } = await api.post(`user/${data.url}`, data.payload)
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } catch (error) {
      console.log(error)
    }
    actions.setSubmitting(false)
  }

  return (
    <section className="page-default page-login fadeIn">
      <Container>
        <div className="py-4">
          <Row className="justify-content-center">
            <Col lg={7}>
              <div className="card-form shadow">
                <header className="mb-5 text-center text-dark">
                  <h1 className="font-weight-bold text-secundary">
                    {!params.token ? 'Recuperar a senha' : 'Alterar a senha'}
                  </h1>
                </header>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                    passwordConfirmation: ''
                  }}
                  onSubmit={forgotPassword}
                  validationSchema={
                    params.token
                      ? schemas.resetPassword
                      : schemas.forgotPassword
                  }
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
                      <div className="form-field mb-4">
                        <label htmlFor="email">E-mail</label>
                        <input
                          type="email"
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
                      {params.token && (
                        <>
                          <div className="form-field mb-4">
                            <label htmlFor="password">Nova Senha</label>
                            <input
                              type={showPassoword ? 'text' : 'password'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="password"
                              value={values.password}
                              autoComplete="off"
                              className={
                                touched.password && errors.password
                                  ? 'error'
                                  : ''
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
                          <div className="form-field">
                            <label htmlFor="passwordConfirmation">
                              Confirmar Nova Senha
                            </label>
                            <input
                              type={showPassoword ? 'text' : 'password'}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              id="passwordConfirmation"
                              value={values.passwordConfirmation}
                              autoComplete="off"
                              className={
                                touched.passwordConfirmation &&
                                errors.passwordConfirmation
                                  ? 'error'
                                  : ''
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
                              {errors.passwordConfirmation &&
                                touched.passwordConfirmation &&
                                errors.passwordConfirmation}
                            </span>
                          </div>
                        </>
                      )}
                      <div className="text-center mt-5">
                        <button
                          className="theme-button secundary"
                          disabled={isSubmitting}
                          type="submit"
                        >
                          {isSubmitting ? (
                            <span className="d-flex justify-content-between align-items-center">
                              {params.token ? 'Salvando' : 'Enviando'}
                              <Spinner
                                animation="border"
                                variant="dark"
                                className="ml-2"
                              />
                            </span>
                          ) : params.token ? (
                            'Salvar'
                          ) : (
                            'Enviar'
                          )}
                        </button>
                      </div>
                      <div className="mt-5 text-center">
                        <small>
                          <Link
                            to="/login"
                            className="text-center text-underline text-secundary font-weight-bold"
                          >
                            Realizar login
                          </Link>
                        </small>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}
