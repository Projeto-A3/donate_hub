import React from 'react'

const TitlePage: React.FC<{ title: string }> = ({ title }) => (
  <h1 className="font-weight-bold text-secundary mb-5">{title}</h1>
)

export default TitlePage
