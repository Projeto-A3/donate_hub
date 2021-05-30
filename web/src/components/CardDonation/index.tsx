import React from 'react'
import { ICardDonation } from 'interfaces'
import { Link } from 'react-router-dom'

const CardDonation: React.FC<ICardDonation> = ({
  title,
  description,
  status,
  editor
}) => {
  return (
    <div className="card-donation bg-light fadeIn">
      {editor && (
        <span className="d-block text-right">
          <Link to="/">Editar</Link>
        </span>
      )}
      <header>
        <p>
          <strong>Título: </strong>
          {title}
        </p>
      </header>
      <main>
        <p>
          <strong>Descrição:</strong>
          <br />
          {description}
        </p>
      </main>
      <footer>
        <p>
          <strong>Status: </strong>
          {status ? 'Fechado' : 'Em andamento'}
        </p>
      </footer>
    </div>
  )
}

export default CardDonation
