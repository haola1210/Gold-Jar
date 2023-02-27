import { useAuthContext } from '@contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const auth = useAuthContext();

  if (!auth?.user) {
    return <Outlet />;
  }

  return (
    <Navigate
      to={'/'}
      replace={true}
    />
  );
};

export default PublicRoute;
