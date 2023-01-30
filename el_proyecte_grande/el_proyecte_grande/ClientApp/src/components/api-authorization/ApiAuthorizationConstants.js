export const ApplicationName = 'el_proyecte_grande';

export const LogoutActions = {
  LogoutCallback: 'logout-callback',
  Logout: 'logout',
  LoggedOut: 'logged-out'
};

export const LoginActions = {
  Login: 'login',
  LoginCallback: 'login-callback',
  LoginFailed: 'login-failed',
  Profile: 'profile',
  Register: 'register'
};

const prefix = 'authentication';

export const ApplicationPaths = {
  DefaultLoginRedirectPath: '/',
  Login: `${prefix}/${LoginActions.Login}/form`,
  Register: `${prefix}/${LoginActions.Register}/form`,
  Logout: `${prefix}/${LogoutActions.Logout}`,
  Profile: "#"
  /*LoginFailed: `${prefix}/${LoginActions.LoginFailed}`,*/
  /*LoginCallback: `${prefix}/${LoginActions.LoginCallback}`,*/
  /*Profile: `${prefix}/${LoginActions.Profile}`,*/
  /*LoggedOut: `${prefix}/${LogoutActions.LoggedOut}`,*/
  /*LogOutCallback: `${prefix}/${LogoutActions.LogoutCallback}`,*/
};
