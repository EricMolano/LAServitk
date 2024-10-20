
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, userRole, requiredRole }) => {
    return userRole === requiredRole ? element : <Navigate to="/login" />;
};
export default PrivateRoute;
