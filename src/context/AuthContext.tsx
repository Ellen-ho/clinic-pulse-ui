import { createContext } from 'react';
import { UserRoleType } from '../types/Users';

export interface AuthState {
  isSignedIn: boolean;
  token: string | null;
  currentUser: {
    id: string;
    role: UserRoleType;
    avatar: string | null;
  } | null;
  doctorId: string | null;
}

export type AuthAction =
  | {
      type: 'SIGN_IN';
      payload: {
        token: string;
        currentUser: {
          id: string;
          role: UserRoleType;
          avatar: string | null;
        };
        doctorId: string;
      };
    }
  | { type: 'SIGN_OUT' }
  | {
      type: 'UPDATE_PROFILE';
      payload: {
        avatar: string | null;
        doctorId: string | null;
      };
    };

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const initialState = {
  isSignedIn: false,
  token: null,
  currentUser: null,
  doctorId: null,
};

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => null,
});
