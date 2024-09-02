import { createContext } from 'react';

export interface NotificationState {
  hasUnread: boolean;
}

export type NotificationAction = {
  type: 'UPDATE_NOTIFICATION';
  payload: {
    hasUnread: boolean;
  };
};

interface NotificationContextProps {
  state: NotificationState;
  dispatch: React.Dispatch<NotificationAction>;
}

export const initialState = {
  hasUnread: false,
};

export const NotificationContext = createContext<NotificationContextProps>({
  state: initialState,
  dispatch: () => null,
});
