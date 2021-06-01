import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Cadastrar from 'pages/Cadastrar'
import Dashboard from 'pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import { useAuth } from 'contexts/auth'
import AdminLogin from 'pages/Admin/Login'
import Admin from 'pages/Admin'
import PrivateRouteAdmin from './PrivateRouteAdmin'

const Routes = () => {
  const { signed, loading, user } = useAuth()
  if (loading) {
    return <h1>Carregando...</h1>
  }
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastrar" component={Cadastrar} />
      <PrivateRoute
        path="/dashboard"
        isAuthenticated={signed}
        component={Dashboard}
      />
      <Route path="/admin/login" exact component={AdminLogin} />
      <PrivateRouteAdmin
        path="/admin"
        isAuthenticated={signed}
        type={user?.user.type || ''}
        component={Admin}
      />
    </Switch>
  )
}

export default Routes
