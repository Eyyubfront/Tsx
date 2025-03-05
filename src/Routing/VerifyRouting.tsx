
import { Outlet, useNavigate } from 'react-router-dom';
import { RootState, useAppSelector } from '../store';
import { useEffect } from 'react';

const VerifyRouting = () => {
  const veriyuse = useAppSelector((state: RootState) => state.Auth.veriyuse);

  let navigate = useNavigate();

  useEffect(() => {
    if (veriyuse) {
      navigate('/languageselector');
    } else {
      navigate('/login');
    }
  }, [veriyuse]);



  return <Outlet />
};

export default VerifyRouting;