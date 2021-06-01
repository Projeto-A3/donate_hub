import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

interface privateRouterProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
  isAuthenticated: boolean
  type: string
}

const PrivateRouteAdmin: React.FC<privateRouterProps> = ({
  component: Component,
  isAuthenticated,
  type,
  ...rest
}) => (
  <Route
    {...rest}
    render={routeProps =>
      isAuthenticated && type.includes('admin') ? (
        <Component {...routeProps} />
      ) : (
        <Redirect
          to={{
            pathname: '/admin/login',
            state: { from: routeProps.location }
          }}
        />
      )
    }
  />
)

export default PrivateRouteAdmin
