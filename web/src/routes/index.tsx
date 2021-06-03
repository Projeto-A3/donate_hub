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
import Sobre from 'pages/Sobre'

const Routes = () => {
  const { signed, userAdmin, signedAdmin } = useAuth()
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastrar" component={Cadastrar} />
      <Route path="/sobre" component={Sobre} />
      <PrivateRoute
        path="/dashboard"
        isAuthenticated={signed}
        component={Dashboard}
      />
      <Route path="/admin/login" exact component={AdminLogin} />
      <PrivateRouteAdmin
        path="/admin"
        isAuthenticated={signedAdmin}
        type={userAdmin?.user.type || ''}
        component={Admin}
      />
    </Switch>
  )
}

export default Routes
