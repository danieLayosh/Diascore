import { createBrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/routes/ProtectedRoute';
import PublicRoute from './components/routes/PublicRoute'; 
import appRoutes from './data/routes';
import PageNotFound from './pages/404Page';
import Welcome from './pages/Welcome'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/welcome' replace />, // Updated path
  },
  {
    element: <PublicRoute />, // Use PublicRoute for /welcome
    children: [
      {
        path: '/welcome', // Updated path
        element: <Welcome />, // Updated component
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