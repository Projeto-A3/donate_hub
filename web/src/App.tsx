import React from 'react'
import Routes from './routes'
import Navigation from './components/navigation'
import './assets/styles/scss/global.scss'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <section className="d-flex flex-column justify-content-center h-100">
          <Navigation />
          <Routes />
        </section>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
