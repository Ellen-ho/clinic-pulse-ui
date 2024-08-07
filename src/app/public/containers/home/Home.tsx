import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import React from 'react';
import HomeLanding from './page/HomeLanding';
import HomeLandingLayout from '../../../layout/HomeLandingLayout';

const Home: React.FC = () => {
  const { state } = useContext(AuthContext);
  const isLoggedIn = state.isLoggedIn;

  return isLoggedIn ? (
    <Navigate to="/dashboard" />
  ) : (
    <HomeLandingLayout>
      <HomeLanding />
    </HomeLandingLayout>
  );
};

export default Home;
