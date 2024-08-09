import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { getAuthFromCache } from '../../utils/getAuthFromCache';
import Layout from '../layout/Layout';

const PrivateRoutes = () => {
  const location = useLocation();
  const cachedAuth = getAuthFromCache();
  const isSignedIn = cachedAuth && cachedAuth.isSignedIn;

  return isSignedIn ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/dashboard" replace={true} state={{ from: location }} />
  );
};

export default PrivateRoutes;
