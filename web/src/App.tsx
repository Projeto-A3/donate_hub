import React from 'react'
import 'assets/styles/scss/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from 'contexts/auth'
import Layout from 'pages/Layout'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
