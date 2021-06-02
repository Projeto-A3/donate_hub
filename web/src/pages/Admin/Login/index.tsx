import React from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { Formik, FormikHelpers } from 'formik'
import schemas from 'schemas/utils'
import { UserAdminLogin } from 'interfaces'
import { useAuth } from 'contexts/auth'

export default function AdminLogin() {
  const { signInAdmin } = useAuth()
  async function requestLogin(
    value: UserAdminLogin,
    actions: FormikHelpers<UserAdminLogin>
  ) {
    actions.setSubmitting(true)
    try {
      await signInAdmin(value)
    } catch (error) {}
    actions.setSubmitting(false)
  }
  return (
    <section className="page-default page-login fadeIn">
      <Container>
        <Row className="justify-content-center">
          <Col lg={7}>
            <div className="card-form shadow">
              <header className="mb-5 text-center text-dark">
                <h1 className="font-weight-bold text-secundary">
                  Login do administrador
                </h1>
              </header>
              <Formik
                initialValues={{
                  email: 'testeteste0301@gmail.com',
                  password: 'teste123'
                }}
                onSubmit={requestLogin}
                validationSchema={schemas.login}
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
                        className={touched.email && errors.email ? 'error' : ''}
                      />
                      <span className="text-danger">
                        {errors.email && touched.email && errors.email}
                      </span>
                    </div>
                    <div className="form-field">
                      <label htmlFor="password">Senha</label>
                      <input
                        type="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="password"
                        value={values.password}
                        autoComplete="off"
                        className={
                          touched.password && errors.password ? 'error' : ''
                        }
                      />
                      <span className="text-danger">
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                    <div className="text-center mt-5">
                      <button
                        className="theme-button secundary"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <span className="d-flex justify-content-between align-items-center">
                            Entrando
                            <Spinner
                              animation="border"
                              variant="dark"
                              className="ml-2"
                            />
                          </span>
                        ) : (
                          'Entrar'
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
