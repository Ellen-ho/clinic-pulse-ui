import { useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../context/AuthContext';

interface IUseRealTimeSocketProps<T extends object> {
  clinicId?: string;
  consultationRoomNumber?: string;
  setRealTimeData: React.Dispatch<React.SetStateAction<T>>;
  onMessage?: (updatedRow: any) => void;
}

const useRealTimeSocket = <T extends object>({
  clinicId,
  consultationRoomNumber,
  setRealTimeData,
  onMessage,
}: IUseRealTimeSocketProps<T>) => {
  const { state } = useContext(AuthContext);
  const userId = state.currentUser?.id;
  const APP_SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = io(APP_SERVER_URL, {
      path: '/ws/real-time',
      transports: ['websocket'],
      query: { userId, clinicId, consultationRoomNumber },
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
    });

    socket.on('connect', () => {
      console.log('Connected to the real time server.');
    });

    socket.on('connect_error', (err) => {
      console.log(err.message);
    });

    socket.on('realTimeCounts', (data: T) => {
      setRealTimeData((prev) => ({
        ...prev,
        ...data,
      }));
    });

    socket.on('realTimeList', (updatedRow: any) => {
      if (onMessage) {
        onMessage(updatedRow);
      } else {
        setRealTimeData((prev) => {
          if ('data' in prev && Array.isArray(prev.data)) {
            const updatedData = prev.data.map((item) =>
              item.id === updatedRow.id ? { ...item, ...updatedRow } : item,
            );
            return {
              ...prev,
              data: updatedData,
            };
          }
          return prev;
        });
      }
    });

    return () => {
      socket.off('realTimeCounts');
      socket.off('realTimeList');
      socket.disconnect();
    };
  }, [
    userId,
    clinicId,
    consultationRoomNumber,
    APP_SERVER_URL,
    setRealTimeData,
    onMessage,
  ]);
};

export default useRealTimeSocket;
