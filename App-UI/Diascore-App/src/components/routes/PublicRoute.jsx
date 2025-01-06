import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a spinner or loading state
  }

  // If user is logged in, redirect to /welcome
  return user ? <Navigate to="/UserPage" /> : <Outlet />;
};

export default PublicRoute;
