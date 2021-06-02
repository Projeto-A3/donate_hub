import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const Loading: React.FC = ({ children }) => {
  return (
    <div className="loading-page">
      <Container>
        <div className="text-center">
          <h1 className="font-weight-bold">Carregando...</h1>
          {children}
          <div className="mt-4">
            <Spinner animation="border" variant="secundary" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Loading
