import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading';
import { AuthContext } from '../Provider/AuthProvider';

// eslint-disable-next-line react/prop-types
const PrivetRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation(); //not understand
    // console.log(location); 
    if (loading) {
        return <Loading></Loading>
    }

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to={'/auth/login'}></Navigate>
};

export default PrivetRoute;