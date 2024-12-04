import { createBrowserRouter, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; 
import PageNotFound from './components/404Page';
import appRoutes from './data/routes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/auth' replace />,
  },
  {
    path: '/auth',
    element: <PublicRoute />, // Use PublicRoute for /auth
    children: [
      {
        path: '/auth',
        element: <Auth />,
      },
    ],
  },
  {
    element: <ProtectedRoute />, // Use ProtectedRoute for authenticated routes
    children: appRoutes,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default router;
