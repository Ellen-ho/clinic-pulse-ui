import { useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';
import { NotificationContext } from '../context/NotificationContext';

const useSocketNotification = () => {
  const { dispatch: notificationDispatch } = useContext(NotificationContext);
  const { state } = useContext(AuthContext);
  const userId = state.currentUser?.id;
  const APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = io(APP_SERVER_URL, {
      path: '/ws/notification',
      transports: ['websocket'],
      query: { userId },
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    socket.on('connect', () => {
      console.log('Connected to the server.');
    });

    socket.on('connect_error', (err) => {
      console.log(err.message);
    });

    socket.on('notification', (data: { hasUnReadNotification: boolean }) => {
      notificationDispatch({
        type: 'UPDATE_NOTIFICATION',
        payload: {
          hasUnread: data.hasUnReadNotification,
        },
      });
    });

    return () => {
      socket.off('notification');
      socket.disconnect();
    };
  }, [userId]);
};

export default useSocketNotification;
