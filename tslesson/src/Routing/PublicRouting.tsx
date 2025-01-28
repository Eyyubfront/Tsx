import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PublicRouting = () => {
  const user = useSelector((state: RootState) => state.Auth.isAuth);


  if (!user ) {
    return  <Outlet /> ;
  }

  return <Navigate to="/login" /> ;
};

export default PublicRouting;
