import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../store';

const ProtectedRouting = () => {
  const user = useSelector((state: RootState) => state.Auth.isAuth);


  let location = useLocation();

  if (user ) {
    return <Outlet />;
  }
  
  return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRouting;
