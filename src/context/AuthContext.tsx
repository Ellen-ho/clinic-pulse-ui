import { createContext } from 'react';
import { UserRoleType } from '../types/Users';

export interface AuthState {
  isSignedIn: boolean;
  token: string | null;
  currentUser: {
    id: string;
    role: UserRoleType;
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
        };
        doctorId: string;
      };
    }
  | { type: 'SIGN_OUT' };

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
