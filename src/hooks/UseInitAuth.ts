import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuthFromCache } from '../utils/getAuthFromCache';

const useInitAuth = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const cachedAuth = getAuthFromCache();
      const isLogin = cachedAuth != null && cachedAuth.isLoggedIn;

      if (isLogin) {
        dispatch({
          type: 'LOG_IN',
          payload: {
            token: cachedAuth.token as string,
            currentUser: cachedAuth.currentUser as {
              id: string;
              displayName: string;
              avatar: string;
              role: string;
            },
            patientId: cachedAuth.patientId as string,
            doctorId: cachedAuth.doctorId as string,
            hasProfile: cachedAuth.hasProfile as boolean,
          },
        });
      } else {
        dispatch({
          type: 'LOG_OUT',
        });
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  return isLoading;
};

export default useInitAuth;
