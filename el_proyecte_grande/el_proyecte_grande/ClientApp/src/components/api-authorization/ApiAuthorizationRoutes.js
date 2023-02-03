import React from 'react';

import { ApplicationPaths } from './ApiAuthorizationConstants';
import RegisterForm from "../AuthenticationForms/RegisterForm";
import LoginForm from "../AuthenticationForms/LoginForm";
import Logout from "../AuthenticationForms/Logout";

const ApiAuthorizationRoutes = [
  {
    path: ApplicationPaths.Register,
    element: <RegisterForm />
  },
  {
    path: `${ApplicationPaths.Login}/:isRedirected`,
    element: <LoginForm />
  },
  {
    path: ApplicationPaths.Logout,
    element: <Logout />
  },
];

export default ApiAuthorizationRoutes;
