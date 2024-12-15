import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute'; 
import appRoutes from './data/routes';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import PageNotFound from './pages/404Page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/home' replace />,
  },
  {
    path: '/home',
    element: <PublicRoute />, // Use PublicRoute for /home
    children: [
      {
        path: '/home',
        element: <Home />,
      },
    ],
  },
  {
    path: '/UserPage',
    element: <ProtectedRoute />, // Use ProtectedRoute for authenticated routes
    children: [
      {
        path: '/UserPage',
        element: <UserPage />,
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