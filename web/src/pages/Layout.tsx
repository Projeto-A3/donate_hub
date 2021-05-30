import React from 'react'
import { useAuth } from 'contexts/auth'
import { ToastContainer } from 'react-toastify'
import Navigation from 'components/Navigation'
import Routes from 'routes'

export default function Layout() {
  const { signed } = useAuth()
  return (
    <section
      className={`h-100 ${
        !signed ? 'd-flex flex-wrap justify-content-center' : ''
      }`}
    >
      <ToastContainer />
      {!signed && (
        <div className="w-100">
          <Navigation />
        </div>
      )}
      <Routes />
    </section>
  )
}
