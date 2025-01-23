import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem("refreshToken")    

    return token ? <Outlet /> : <Navigate to="/login" />;
};

