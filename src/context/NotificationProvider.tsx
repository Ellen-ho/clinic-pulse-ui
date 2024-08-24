import { useReducer } from 'react';
import {
  NotificationAction,
  NotificationContext,
  NotificationState,
  initialState,
} from './NotificationContext';

const reducer = (
  state: NotificationState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case 'UPDATE_NOTIFICATION': {
      const udpatedState = {
        hasUnread: action.payload.hasUnread,
      };
      return {
        ...state,
        ...udpatedState,
      };
    }
    default:
      return state;
  }
};

export const NotificationProvider: React.FC<{ children: any }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};
