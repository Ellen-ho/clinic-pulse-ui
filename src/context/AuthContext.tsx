import { createContext } from 'react';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  currentUser: {
    id: string;
    displayName: string;
    role: string;
    avatar: string | null;
  } | null;
  patientId: string | null;
  doctorId: string | null;
  hasProfile: boolean;
}

export type AuthAction =
  | {
      type: 'LOG_IN';
      payload: {
        token: string;
        currentUser: {
          id: string;
          displayName: string;
          role: string;
          avatar: string | null;
        };
        patientId: string;
        doctorId: string;
        hasProfile: boolean;
      };
    }
  | { type: 'LOG_OUT' }
  | {
      type: 'UPDATE_PROFILE';
      payload: {
        avatar: string | null;
        patientId: string | null;
        doctorId: string | null;
        hasProfile: boolean;
      };
    };

interface AuthContextProps {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const initialState = {
  isLoggedIn: false,
  token: null,
  currentUser: null,
  patientId: null,
  doctorId: null,
  hasProfile: false,
};

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  dispatch: () => null,
});
