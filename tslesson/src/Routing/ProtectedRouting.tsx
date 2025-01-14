import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../store';

const ProtectedRoute = () => {
 const user = useSelector((state: RootState) => state.UserAll.user);
 let location = useLocation();

 // Check if the user is not null to determine authentication
 if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
 }

 return <Outlet />;
};

export default ProtectedRoute;