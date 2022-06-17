import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<h1>Loading...</h1>} >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'login',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      ),
    },
    // Dashboard Routes
    {
      path: '/',
      element: (
        <AuthGuard>
          <GamePage />
        </AuthGuard>
      ),
    },
    { path: '*', element: <Navigate to="/" /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/LoginPage')));

// DASHBOARD
const GamePage = Loadable(lazy(() => import('../pages/game/GamePage')));
