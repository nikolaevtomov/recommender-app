import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Details from './components/Details'
import PasswordUpdate from './components/PasswordUpdate'

const PrivateRoute = ({ isAuthenticated, children, ...rest}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
      isAuthenticated ? (children) : (<Redirect to={{ pathname: "/login/", state: { from: location }}} />)
    } />
  );
}

const Urls = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login/"><Login {...props} /></Route>
        <PrivateRoute exact path="/:page?/" isAuthenticated={props.isAuthenticated}><Home {...props}/></PrivateRoute>
        <PrivateRoute exact path="/update-password/" isAuthenticated={props.isAuthenticated}><PasswordUpdate {...props}/></PrivateRoute>
        <PrivateRoute path="/details/:id/" isAuthenticated={props.isAuthenticated}><Details {...props}/></PrivateRoute>
      </Switch>
    </BrowserRouter>
  )
}

export default Urls