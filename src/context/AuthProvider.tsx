import { useEffect, useReducer } from 'react';
import {
  AuthAction,
  AuthContext,
  AuthState,
  initialState,
} from './AuthContext';

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOG_IN': {
      const udpatedState = {
        isLoggedIn: true,
        token: action.payload.token,
        currentUser: action.payload.currentUser,
        patientId: action.payload.patientId,
        doctorId: action.payload.doctorId,
        hasProfile: action.payload.hasProfile,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    case 'LOG_OUT': {
      const udpatedState = {
        isLoggedIn: false,
        token: null,
        currentUser: null,
        patientId: null,
        doctorId: null,
        hasProfile: false,
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
        hasProfile: action.payload.hasProfile,
        patientId: action.payload.patientId,
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
