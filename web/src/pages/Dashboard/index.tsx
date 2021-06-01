import React from 'react'
import Home from './Home'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import { FaHome, FaMoneyBillAlt, FaUser, FaPowerOff } from 'react-icons/fa'
import { GiHeartPlus } from 'react-icons/gi'
import Logo from 'assets/images/logo.svg'
import { useAuth } from 'contexts/auth'
import Perfil from './Pefil'
import Contribuir from './Contribuir'
import PedidoDoacao from './PedidoDoacao'

export default function Dashboard({ match }: RouteComponentProps) {
  const { signOut, user } = useAuth()
  if (!user) return null

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
          {user.user.type.includes('doador') ? (
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
          ) : (
            <li>
              <NavLink
                to="/dashboard/pedido-doacao"
                exact
                activeClassName="active"
              >
                <span className="icon">
                  <GiHeartPlus size={30} />
                </span>
                Pedido de doação
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
          <Route
            path={`${match.url}/contribuir`}
            render={routeProps =>
              user.user.type.includes('doador') ? (
                <Contribuir />
              ) : (
                <Redirect
                  to={{
                    pathname: match.url,
                    state: { from: routeProps.location }
                  }}
                />
              )
            }
          />
          <Route
            path={`${match.url}/pedido-doacao`}
            render={routeProps =>
              user.user.type.includes('donatario') ? (
                <PedidoDoacao />
              ) : (
                <Redirect
                  to={{
                    pathname: match.url,
                    state: { from: routeProps.location }
                  }}
                />
              )
            }
          />
        </Switch>
      </main>
    </div>
  )
}
