import React from 'react'
import {
  Link,
  NavLink,
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom'
import Logo from 'assets/images/logo.svg'
import { FaHome, FaPowerOff } from 'react-icons/fa'
import { useAuth } from 'contexts/auth'
import Home from './Home'

export default function Admin({ match }: RouteComponentProps) {
  const { signOut } = useAuth()

  return (
    <div className="dashboard-page fadeIn">
      <nav className="bg-light">
        <Link to="/admin">
          <img src={Logo} alt="Donate Hub" title="Donate Hub" />
        </Link>
        <ul>
          <li>
            <NavLink to="/admin" exact activeClassName="active">
              <span className="icon">
                <FaHome size={30} />
              </span>
              Página Inicial
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
          <Route path={`${match.url}`} exact component={Home} />
        </Switch>
      </main>
    </div>
  )
}
