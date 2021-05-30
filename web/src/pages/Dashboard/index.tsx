import React from 'react'
import Home from './Home'
import { Route, RouteComponentProps, Switch } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { FaHome, FaMoneyBillAlt, FaUser, FaPowerOff } from 'react-icons/fa'
import Logo from 'assets/images/logo.svg'
import { useAuth } from 'contexts/auth'
import Perfil from './Pefil'
import Contribuir from './Contribuir'

export default function Dashboard({ match }: RouteComponentProps) {
  const { signOut, user } = useAuth()
  return (
    <div className="dashboard-page">
      <nav className="bg-light">
        <Link to="dashboard">
          <img src={Logo} alt="Donate Hub" title="Donate Hub" />
        </Link>
        <ul>
          <li>
            <NavLink to="/dashboard" exact activeClassName="active">
              <span className="icon">
                <FaHome size={30} />
              </span>
              Página Inicial
            </NavLink>
          </li>
          {user?.user.type.includes('doador') && (
            <li>
              <NavLink
                to="/dashboard/contribuir"
                exact
                activeClassName="active"
              >
                <span className="icon">
                  <FaMoneyBillAlt size={30} />
                </span>
                Contribuir
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/dashboard/perfil" exact activeClassName="active">
              <span className="icon">
                <FaUser size={30} />
              </span>
              Perfil
            </NavLink>
          </li>
        </ul>
        <button type="button" onClick={signOut}>
          <FaPowerOff size={30} />
          Log Out
        </button>
      </nav>
      <main className="bg-white">
        <Switch>
          <Route path={match.url} exact component={Home} />
          <Route path={`${match.url}/perfil`} component={Perfil} />
          <Route path={`${match.url}/contribuir`} component={Contribuir} />
        </Switch>
      </main>
    </div>
  )
}
