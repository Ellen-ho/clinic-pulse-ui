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
        permissions: action.payload.permissions,
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
        permissions: {
          id: '',
          role: 'DOCTOR',
          dashboardRead: false,
          consultationRead: false,
          feedbackSurveyRead: false,
          onlineReviewRead: false,
          reportCenterRead: false,
          timeSlotRead: false,
          staffManagementRead: false,
          staffManagementEdit: false,
          profileRead: false,
          profileEdit: false,
          createdAt: '',
          updatedAt: '',
        },
        doctorId: null,
      };
      localStorage.setItem('auth', JSON.stringify(udpatedState));
      return {
        ...state,
        ...udpatedState,
      };
    }
    case 'UPDATE_PROFILE': {
      const updatedState = {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.payload.avatar,
        } as Required<AuthState['currentUser']>,
        doctorId: action.payload.doctorId,
      };

      localStorage.setItem('auth', JSON.stringify(updatedState));
      return updatedState;
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
