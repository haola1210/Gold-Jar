import { useAuthContext } from '@contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = useAuthContext();

  if (auth?.user) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={'/login'}
      replace={true}
    />
  );
};

export default PrivateRoute;
