import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Cadastrar from 'pages/cadastrar'
import DashboardHome from 'pages/dashboard/Home'
import PrivateRoute from './PrivateRoute'
import { useAuth } from 'contexts/auth'

const Routes = () => {
  const { signed } = useAuth()
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastrar" component={Cadastrar} />
      <PrivateRoute
        path="/dashboard"
        isAuthenticated={signed}
        component={DashboardHome}
      />
    </Switch>
  )
}

export default Routes
