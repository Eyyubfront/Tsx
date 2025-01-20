import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PublicRouting = () => {
  const user = useSelector((state: RootState) => state.Auth.isAuth);
  const token = localStorage.getItem('token'); 

  if (user || token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PublicRouting;
