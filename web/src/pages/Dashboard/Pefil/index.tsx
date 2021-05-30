import { useAuth } from 'contexts/auth'
import { Formik } from 'formik'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Perfil() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <Container className="fadeIn" fluid>
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="card-form bg-light shadow">
            <header className="mb-5 text-center text-dark">
              <h1 className="font-weight-bold text-secundary">Editar perfil</h1>
            </header>
            <Formik
              initialValues={{ name: user.user.name, email: user.user.email }}
              onSubmit={() => console.log('ok')}
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
                      className={touched.name && errors.name ? 'error' : ''}
                    />
                    <span className="text-danger">
                      {errors.name && touched.name && errors.name}
                    </span>
                  </div>
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
                </form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
