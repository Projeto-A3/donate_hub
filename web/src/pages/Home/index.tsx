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
            <p className="mb-1">
              Encontre uma pessoa ou familia e faça a sua doação para que possam
              ter vidas dignas. Ajude pessoas fámilias que clamam por ajuda na
              plataforma donate hub, você encontrá pessoas reais, com
              necessidades reais e poderá atender a pedidos de doações como
              alimentos, remédios, kit de necessidade básica e ou ajuda
              financeira.
            </p>
            <p className="mb-1">
              Neste momento há mais de 13 milhões de pessoas desempregadas no
              Brasil e muitas delas tem que abandonar suas casas pois não tem
              condição de pagar o aluguel, não tendo a oportunidade de alimentar
              a si próprio e nem aos seus filhos, devido a pandemia de covid-19
              que assombra todo o mundo e afeta milhões de pessoas no Brasil.
            </p>
            <p className="mb-1">
              Donate Hub é um projeto universitário que visa direcionar doações
              a familias esquecidas pelos nossos governantes e sem condições de
              ter o minimo possivel para ter uma vida digna.
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
