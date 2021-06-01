import React from 'react'
import { ICardDonation } from 'interfaces'
import { Button } from 'react-bootstrap'

const CardDonation: React.FC<ICardDonation> = ({
  title,
  description,
  status,
  donee
}) => {
  return (
    <div className="card-donation bg-light fadeIn">
      <header>
        <p>
          <strong>Título: </strong>
          {title}
        </p>
      </header>
      <main>
        <p className="mb-1">
          <strong>Descrição:</strong>
          <br />
          {description}
        </p>
        <p className="mb-1">
          <strong>Status: </strong>
          {status ? 'Fechado' : 'Em andamento'}
        </p>
        <p className="mb-1">
          <strong>Nome: </strong>
          {donee.name}
        </p>
        <p className="mb-0">
          <strong className="d-block">Contatos: </strong>
          <span className="d-block">
            Tel:{' '}
            {donee.phone.replace(
              donee.phone.length > 10
                ? /(\d{2})(\d{5})(\d*)/
                : /(\d{2})(\d{4})(\d*)/,
              '($1) $2-$3'
            )}
          </span>
          <span className="d-block">
            E-mail: <a href={`mailto:${donee.email}`}>{donee.email}</a>
          </span>
        </p>
      </main>
      <footer>
        <div className="text-center mt-4">
          <Button type="button" variant="secundary">
            Contribuir
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default CardDonation
