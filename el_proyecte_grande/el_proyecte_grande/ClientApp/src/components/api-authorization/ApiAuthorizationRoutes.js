import React from 'react';

import { ApplicationPaths } from './ApiAuthorizationConstants';
import RegisterForm from "../AuthenticationForms/RegisterForm";
import LoginForm from "../AuthenticationForms/LoginForm";
import Logout from "../AuthenticationForms/Logout";
import ProfilePage from "../UserPage/ProfilePage";

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
  { 
    path: ApplicationPaths.Profile,
    element: <ProfilePage />
  }
];

export default ApiAuthorizationRoutes;
