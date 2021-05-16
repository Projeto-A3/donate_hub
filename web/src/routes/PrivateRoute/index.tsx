import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router'

interface privateRouterProps extends RouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>
  isAuthenticated: boolean
}

const PrivateRoute: React.FC<privateRouterProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={routeProps =>
      isAuthenticated ? (
        <Component {...routeProps} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: routeProps.location }
          }}
        />
      )
    }
  />
)

export default PrivateRoute
