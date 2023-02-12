import React, {Fragment, useEffect, useState} from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import authenticationService from "./authenticationService";

const LoginMenu = ({isAuthenticated, onChangeAuthenticated}) => {
  const [userName, setUserName] = useState(null)
  
  useEffect(() => {
    populateState(onChangeAuthenticated, setUserName)
  }, [isAuthenticated])
  
  if (!isAuthenticated) {
    const registerPath = `${ApplicationPaths.Register}`;
    const loginPath = `${ApplicationPaths.Login}/false`;
    return anonymousView(registerPath, loginPath);
  } else {
    const profilePath = `${ApplicationPaths.Profile}`;
    const logoutPath = `${ApplicationPaths.Logout}`;
    const logoutState = { local: true };
    return authenticatedView(userName, profilePath, logoutPath, logoutState);
  } 
}

const populateState = (onChangeAuthenticated, setUserName) => {
  onChangeAuthenticated(authenticationService.isAuthenticated())
  setUserName(authenticationService.getCurrentUser()["Email"])
}

const authenticatedView = (userName, profilePath, logoutPath, logoutState) => {
  return (<Fragment>
    <NavItem>
      <NavLink tag={Link} className="text-dark fw-bold" to={profilePath}>Profile</NavLink>
    </NavItem>
    <NavItem>
      <NavLink replace tag={Link} className="text-dark fw-bold" to={logoutPath} state={logoutState}>Logout</NavLink>
    </NavItem>
  </Fragment>);
}

const anonymousView = (registerPath, loginPath) => {
  return (<Fragment>
    <NavItem>
      <NavLink tag={Link} className="text-dark fw-bold" to={registerPath}>Register</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} className="text-dark fw-bold" to={loginPath}>Login</NavLink>
    </NavItem>
  </Fragment>);
}

export default LoginMenu;
