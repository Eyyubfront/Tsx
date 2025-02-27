
import {  Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '../store';
import { useEffect } from 'react';

const PublicRouting = () => {
  const user = useAppSelector((state: RootState) => state.Auth.isAuth);

  let location = useLocation();
  let navigate = useNavigate();


  useEffect(() => {
    if (user === true) {
      navigate(location.state || "/")
    }
  }, [user,location.state,navigate])

  if (user === false) {
    return <Outlet />;
  }
  return null;
};

export default PublicRouting;
