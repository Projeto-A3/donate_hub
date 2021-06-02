import React from 'react'
import { useAuth } from 'contexts/auth'
import { ToastContainer } from 'react-toastify'
import Navigation from 'components/Navigation'
import Routes from 'routes'

export default function Layout() {
  const { signed, signedAdmin } = useAuth()
  return (
    <section
      className={`h-100 ${
        !signed && !signedAdmin ? 'd-flex flex-wrap justify-content-center' : ''
      }`}
    >
      <ToastContainer />
      {!signed && !signedAdmin && (
        <div className="w-100">
          <Navigation />
        </div>
      )}
      <Routes />
    </section>
  )
}
