import { useReducer } from 'react';
import {
  AuthAction,
  AuthContext,
  AuthState,
  initialState,
} from './AuthContext';

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGN_IN': {
      const udpatedState = {
        isSignedIn: true,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
        doctorId: action.payload.doctorId,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    case 'SIGN_OUT': {
      const udpatedState = {
        isSignedIn: false,
        token: null,
        currentUser: null,
        doctorId: null,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    case 'UPDATE_PROFILE': {
      const udpatedState = {
        ...state,
        doctorId: action.payload.doctorId,
      };
      udpatedState.currentUser!.avatar = action.payload.avatar;

      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
