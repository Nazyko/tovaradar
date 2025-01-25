import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const token = localStorage.getItem("accessToken")    

    return token ? <Outlet /> : <Navigate to="/login" />;
};

