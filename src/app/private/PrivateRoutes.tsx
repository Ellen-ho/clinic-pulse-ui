import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getAuthFromCache } from '../../utils/getAuthFromCache';
import Layout from '../layout/Layout';

const PrivateRoutes = () => {
  const location = useLocation();
  const cachedAuth = getAuthFromCache();
  const isLoggedIn = cachedAuth && cachedAuth.isLoggedIn;

  return isLoggedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/signin" replace={true} state={{ from: location }} />
  );
};

export default PrivateRoutes;
