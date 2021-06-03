import React, { useEffect, useState } from 'react'
import Logo from 'assets/images/logo.svg'
import { FaHome, FaInfoCircle, FaPowerOff, FaUser } from 'react-icons/fa'
import { BiDonateHeart } from 'react-icons/bi'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from 'contexts/auth'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useAdminContext } from 'contexts/admin'

const NavigationAdmin: React.FC = () => {
  const { signOut } = useAuth()
  const [donatesInactive, setDonatesInactive] = useState(0)
  const { donations } = useAdminContext()

  useEffect(() => {
    setDonatesInactive(donations.filter(({ status }) => status === 0).length)
  }, [donations])

  return (
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
        <li>
          <NavLink to="/admin/donates" exact activeClassName="active">
            {Boolean(donatesInactive) && (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip id="donates-inactives-tooltip">
                    {donatesInactive > 1
                      ? `${donatesInactive} inativos`
                      : `${donatesInactive} inativo`}
                  </Tooltip>
                }
              >
                {({ ref, ...triggerHandler }) => (
                  <button {...triggerHandler} className="btn-donates-inactives">
                    <span className="ml-1 text-cyan" ref={ref}>
                      <FaInfoCircle />
                    </span>
                  </button>
                )}
              </OverlayTrigger>
            )}
            <span className="icon">
              <BiDonateHeart size={30} />
            </span>
            Doações
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" exact activeClassName="active">
            <span className="icon">
              <FaUser size={30} />
            </span>
            Usuários
          </NavLink>
        </li>
      </ul>
      <button type="button" onClick={signOut}>
        <FaPowerOff size={30} />
        Log Out
      </button>
    </nav>
  )
}

export default NavigationAdmin
