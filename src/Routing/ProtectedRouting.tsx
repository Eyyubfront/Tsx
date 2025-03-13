import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '../store';
import { useEffect } from 'react';

const ProtectedRouting = () => {
  const user = useAppSelector((state: RootState) => state.Auth.isAuth);


  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (user === false || user===null) {
      navigate("/login", { state: location.pathname })
      navigate(0)
    }
  }, [user])

  if (user === true) {
    return <Outlet />;
  }
  return null;
};

export default ProtectedRouting;
