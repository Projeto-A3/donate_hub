import React from 'react'
import TitlePage from 'components/TitlePage'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { Formik, FormikHelpers } from 'formik'
import { RegisterDonation } from 'interfaces'
import schemas from 'schemas/utils'
import IconDonation from 'assets/images/donation-register-icon.svg'
import api from 'services/api'
import { toast } from 'react-toastify'

export default function PedidoDoacao() {
  const defaultValues = {
    title: '',
    description: ''
  } as RegisterDonation

  async function saveDonation(
    value: RegisterDonation,
    actions: FormikHelpers<RegisterDonation>
  ) {
    actions.setSubmitting(true)
    try {
      const { data } = await api.post<{ message: string }>('donations', value)
      toast.success(data.message)
    } catch (error) {}
    actions.setSubmitting(false)
  }

  return (
    <Container className="fadeIn" fluid>
      <TitlePage title="Ajude o próximo, cadastre um pedido" />
      <Row className="align-items-center justify-content-between">
        <Col lg={6}>
          <img
            src={IconDonation}
            alt="Ajude o próximo, cadastre um pedido"
            className="img-fluid"
          />
          <h2 className="font-weight-bold text-secundary text-center">
            Faça a diferença, ajude o próximo!
          </h2>
          <p className="text-center">
            Conte com quem deseja fazer o bem! Em momentos críticos não tenha
            vergonha de pedir ajuda, cadastre seu pedido de doação para que
            nossos doadores entrem em contato com você.
          </p>
        </Col>
        <Col lg={5}>
          <div className="card-form bg-light shadow">
            <header className="mb-5 text-center text-dark">
              <p className="h1 font-weight-bold text-secundary">
                Cadastre um novo pedido
              </p>
            </header>
            <Formik
              initialValues={defaultValues}
              onSubmit={saveDonation}
              validationSchema={schemas.registerDonation}
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
                    <label htmlFor="title">Título</label>
                    <input
                      type="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="title"
                      value={values.title}
                      autoComplete="off"
                      className={touched.title && errors.title ? 'error' : ''}
                    />
                    <span className="text-danger">
                      {errors.title && touched.title && errors.title}
                    </span>
                  </div>
                  <div className="form-field mb-4">
                    <label htmlFor="description">
                      Descrição{' '}
                      <small>
                        (Conte-nos sua breve história e como podemos te ajudar)
                      </small>
                    </label>
                    <textarea
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="description"
                      value={values.description}
                      autoComplete="off"
                      rows={5}
                      className={
                        touched.description && errors.description ? 'error' : ''
                      }
                    />
                    <span className="text-danger">
                      {errors.description &&
                        touched.description &&
                        errors.description}
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
  )
}
