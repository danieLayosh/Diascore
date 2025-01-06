import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a spinner or loading state
  }

  return user ? <Navigate to="/home" /> : <Outlet />;
};

export default PublicRoute;
