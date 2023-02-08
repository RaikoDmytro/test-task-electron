import { useContext } from 'react';
import { AuthContext } from "../../context/auth-context";
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);

  return (!isAuth) ? <Navigate replace to="/login" /> : children;
};

export default PrivateRoute;
