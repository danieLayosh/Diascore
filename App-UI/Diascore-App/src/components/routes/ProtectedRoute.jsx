import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a spinner or loading state
  }

  return user ? <Outlet /> : <Navigate to="/welcome" />;
};

export default ProtectedRoute;
