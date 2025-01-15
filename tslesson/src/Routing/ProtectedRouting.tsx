import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../store';

const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.UserAll.user);
  const loading = useSelector((state: RootState) => state.UserAll.loading); 
  let location = useLocation();

  if (!user && !loading) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
