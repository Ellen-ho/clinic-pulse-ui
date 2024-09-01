import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAuthFromCache } from '../utils/getAuthFromCache';
import { IPermission, UserRoleType } from '../types/Users';

const useInitAuth = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const cachedAuth = getAuthFromCache();
      const isSignedIn = cachedAuth != null && cachedAuth.isSignedIn;

      if (isSignedIn) {
        dispatch({
          type: 'SIGN_IN',
          payload: {
            token: cachedAuth.token as string,
            currentUser: cachedAuth.currentUser as {
              id: string;
              avatar: string;
              role: UserRoleType;
            },
            permissions: cachedAuth.permissions as IPermission,
            doctorId: cachedAuth.doctorId as string,
          },
        });
      } else {
        dispatch({
          type: 'SIGN_OUT',
        });
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  return isLoading;
};

export default useInitAuth;
