import React from 'react';

import { ApplicationPaths, LoginActions, LogoutActions } from './ApiAuthorizationConstants';
import RegisterForm from "../AuthenticationForms/RegisterForm";
import LoginForm from "../AuthenticationForms/LoginForm";
import Logout from "../AuthenticationForms/Logout";

const ApiAuthorizationRoutes = [
  {
    path: ApplicationPaths.Register,
    element: <RegisterForm />
  },
  {
    path: ApplicationPaths.Login,
    element: <LoginForm />
  },
  {
    path: ApplicationPaths.Logout,
    element: <Logout />
  },
];

export default ApiAuthorizationRoutes;
