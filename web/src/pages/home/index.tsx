import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import bannerImage from '../../assets/images/banner_home.svg'

const Home = () => {
  return (
    <section className="page-default page-home fadeIn">
      <Container>
        <Row className="justify-content-between align-items-center flex-column-reverse flex-lg-row">
          <Col lg={5}>
            <h1 className="extra-bold text-secundary mb-4">
              Leve a felicidade para o próximo
            </h1>
            <p className="m-1">
              Faça uma doação para que famílias, possam ter vidas dignas e
              seguras.
            </p>

            <p className="m-1">
              Ajude fámilias, através da plataforma Donate Hub, a atender às
              necessidades básicas de alimentação, saúde, moradia, educação e
              água potável de milhões de famílias na linha da pobreza nesse
              imenso país.
            </p>

            <p className="m-1">
              Neste momento, mais de 8 milhões de pessoas foram forçadas a
              abandonar suas casas devido a falta de emprego, resseção economica
              e a Pandemia do covid-19.
            </p>
            <p className="mb-0">
              O Donate Hub, é um projeto universitário que visa chegar doações a
              familia com mais necessidades e esquecidas pelos nossos
              governantes.
            </p>
          </Col>
          <Col lg={7}>
            <Image src={bannerImage} alt="" fluid />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Home
