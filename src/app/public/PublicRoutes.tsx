import { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAuthFromCache } from '../../utils/getAuthFromCache';
import Layout from '../layout/Layout';

const PublicRoutes = () => {
  const location = useLocation();
  const { state } = useContext(AuthContext);

  const cachedAuth = getAuthFromCache();
  const isSignedIn = cachedAuth && cachedAuth.isSignedIn;

  return isSignedIn ? (
    <Navigate to="/dashboard" replace={true} state={{ from: location }} />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PublicRoutes;
