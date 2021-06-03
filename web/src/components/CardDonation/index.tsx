import React from 'react'
import { ICardDonation } from 'interfaces'
import { Button } from 'react-bootstrap'

interface PropsCard extends ICardDonation {
  select?(id: number | undefined): void
  textButton?: string
}

const CardDonation: React.FC<PropsCard> = ({
  id,
  title,
  description,
  status,
  donee,
  textButton,
  createdAt,
  children,
  select
}) => {
  function textStatus() {
    switch (status) {
      case 0:
        return 'Inativo'
      case 1:
        return 'Ativo'
      default:
        return 'Resolvido'
    }
  }

  return (
    <div className="card-donation bg-light fadeIn">
      <header>
        <p className="mb-1">
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
          {textStatus()}
        </p>
        {donee && (
          <>
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
          </>
        )}
        <p className="mb-0">
          {createdAt && (
            <>
              <strong>Data do pedido: </strong>
              {new Date(createdAt).toLocaleString()}
            </>
          )}
        </p>
      </main>
      <footer>
        {select && (
          <div className="text-center mt-4">
            <Button
              type="button"
              variant="secundary"
              onClick={() => select(id)}
              block
            >
              {textButton || 'Contribuir'}
            </Button>
          </div>
        )}
        {children}
      </footer>
    </div>
  )
}

export default CardDonation
