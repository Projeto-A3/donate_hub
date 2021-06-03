import React from 'react'

interface PropsMembers {
  name: string
  ra: string
  image: string
}

const Member: React.FC<PropsMembers> = ({ name, image, ra }) => {
  return (
    <div className="card-member text-center">
      <img src={image} alt={name} className="img-fluid" />
      <div className="info">
        <p className="mb-0">
          <strong>Nome: </strong> {name}
        </p>
        <p className="mb-0">
          <strong>RA: </strong> {ra}
        </p>
      </div>
    </div>
  )
}

export default Member
