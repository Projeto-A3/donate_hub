import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from '../pages/home'
import Login from '../pages/login'
import Cadastrar from 'pages/cadastrar'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/cadastrar" component={Cadastrar} />
    </Switch>
  )
}

export default Routes
