import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import Home from './Home'
import Donates from './Donates'
import NavigationAdmin from 'components/NavigationAdmin'
import { AdminProvider } from 'contexts/admin'
import Users from './Users'

export default function Admin({ match }: RouteComponentProps) {
  return (
    <AdminProvider>
      <div className="dashboard-page fadeIn">
        <NavigationAdmin />
        <main className="bg-white">
          <Switch>
            <Route path={`${match.url}`} exact component={Home} />
            <Route path={`${match.url}/donates`} exact component={Donates} />
            <Route path={`${match.url}/users`} exact component={Users} />
          </Switch>
        </main>
      </div>
    </AdminProvider>
  )
}
