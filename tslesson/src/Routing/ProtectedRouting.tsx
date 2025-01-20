import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../store';

const ProtectedRouting = () => {
  const user = useSelector((state: RootState) => state.Auth.isAuth);
  const token = localStorage.getItem('token'); 

  let location = useLocation();

  if (!user && !token) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRouting;
