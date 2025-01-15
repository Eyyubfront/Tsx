import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PublicRoute = () => {
  const user = useSelector((state: RootState) => state.UserAll.user);

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
