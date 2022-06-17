import PropTypes from 'prop-types';
// hooks
import useAuth from '../hooks/useAuth';
// pages
import LoginPage from '../pages/auth/LoginPage';
// components

// Guard for making sure the Dashboard wrapping Authentification 
// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
