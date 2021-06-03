import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import victor from 'assets/images/avatars/victor.png'
import eduardo from 'assets/images/avatars/eduardo.png'
import lucas from 'assets/images/avatars/lucas.png'
import breno from 'assets/images/avatars/breno.png'
import gabriel from 'assets/images/avatars/gabriel.png'
import Member from 'components/Member'

export default function Sobre() {
  const listMembers = [
    {
      name: 'Uisma Lopes',
      ra: '819148343',
      image: 'https://avatars.githubusercontent.com/uismalopes'
    },
    {
      name: 'Eduardo Moraes',
      ra: '819164072',
      image: eduardo
    },
    {
      name: 'Victor Carapeto',
      ra: '819144457',
      image: victor
    },
    {
      name: 'Breno Rossi',
      ra: '819156706',
      image: breno
    },
    {
      name: 'Lucas Lima',
      ra: '819152926',
      image: lucas
    },
    {
      name: 'Gabriel Rulo',
      ra: '819167927',
      image: gabriel
    }
  ]
  return (
    <Container>
      <p className="h1 font-weight-bold text-secundary">Quem Somos</p>
      <p>
        Somos uma equipe de estudantes da Universidade São Judas, e durante o
        semestre corrente trabalhamos nesta página, com o objetivo de concluir o
        Projeto A3 que irá compor às notas das UC’S “Usabilidade,
        desenvolvimento web, mobile e jogos” e “ Sistemas distribuídos e mobile”
        Comandadas respectivamente pelos professores: Andreia Cristina Grisolio
        Machion, Igor Moreira Félix, Elcio Abrahão e Hamilton Machiti da Costa.
      </p>
      <p className="h1 font-weight-bold text-secundary">Sobre o Projeto</p>
      <p>
        O Projeto tem como proposito criar um site, utilizando os conhecimentos
        adquiridos durante o semestre, e que o tema geral é: soluções para
        problemas causados pela pandemia. A “Donate Hub” tem como objetivo
        alcançar pessoas mais necessitadas em meio a pandemia, sendo o
        integrador entre o doador e donatário.
      </p>
      <p className="h1 font-weight-bold text-secundary">Integrantes</p>
      <Row>
        {listMembers.map(item => (
          <Col key={item.name} lg={2}>
            <Member image={item.image} name={item.name} ra={item.ra} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}
