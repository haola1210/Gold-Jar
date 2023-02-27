import { useAuthContext } from '@contexts/AuthContext';
import { me } from '@services/user.service';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (auth.user === undefined) {
        try {
          const user = await me();
          auth.login?.(user);
        } catch (error) {
          navigate('/login', { replace: true });
        }
      }
    })();
  }, [auth]);

  return auth.user ? <Outlet /> : <>Loading ...</>;
};

export default PrivateRoute;
