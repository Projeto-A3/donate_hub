import React from 'react'
import { useAuth } from 'contexts/auth'
import { Card, Col, Container, Row } from 'react-bootstrap'
import TitlePage from 'components/TitlePage'

export default function DashboardHome() {
  const { user } = useAuth()

  if (!user) return null

  const listNews = [
    {
      title: 'Fome on Brasil em tempos de pandemia',
      description:
        'Segundo o IBGE, existem aproximadamente 14 milhões de pessoas desempregadas no Brasil e 10 milhões dessas pessoas passam fome.(<a href="https://agenciabrasil.ebc.com.br/geral/noticia/2020-09/ibge-inseguranca-alimentar-grave-atinge-103-milhoes-de-brasileiros" target="blank">https://agenciabrasil.ebc.com.br/geral/noticia/2020-09/ibge-inseguranca-alimentar-grave-atinge-103-milhoes-de-brasileiros</a>)'
    },
    {
      title: 'Situação de Pobreza no país',
      description:
        'A pobreza extrema no Brasil atingiu 50 milhoes de pessoas no ano de 2020, segundo o portal de noticias G1.(<a href="https://g1.globo.com/jornal-nacional/noticia/2020/11/12/ibge-brasil-tem-quase-52-milhoes-de-pessoas-na-pobreza-e-13-milhoes-na-extrema-pobreza.ghtml" target="blank">https://g1.globo.com/jornal-nacional/noticia/2020/11/12/ibge-brasil-tem-quase-52-milhoes-de-pessoas-na-pobreza-e-13-milhoes-na-extrema-pobreza.ghtml</a>)'
    },
    {
      title: 'Recomendações da oms',
      description:
        'A organização mundial da saúde, informa que devemos manter no minimo um metro e meio de distância da pessoas, usar mascara, higienizar as mãos e ficar em casa se puder.(<a href="https://www.who.int/" target="blank">https://www.who.int/</a>) <br />USE_MASCARA, #FiqueEmCasa, #VacinaSIM.'
    },
    {
      title: 'Andamento da vacinação no país',
      description:
        'Andamento da vacinação no país egundo site do ministério da saúde, já foram distribuidas 75.594.692 e ouve 46.875.460 de vacinados. (<a href="https://www.gov.br/saude/pt-br" target="blank">https://www.gov.br/saude/pt-br</a>)'
    }
  ]

  return (
    <Container className="fadeIn" fluid>
      <TitlePage title={`Bem vindo, ${user.user.name}`} />
      <h2 className="font-weight-bold text-secundary my-5">
        Notícias sobre o covid
      </h2>
      <Row>
        {listNews.map((item, index) => {
          return (
            <Col key={index} lg={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">
                    <strong>{item.title}</strong>
                  </h5>
                </Card.Header>
                <Card.Body>
                  <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
