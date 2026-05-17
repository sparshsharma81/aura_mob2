import { useEffect } from 'react';
import { createSocket } from '@/services/socket/socket';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSocket } from '@/features/socket/socketSlice';
import { setOnlineUsers } from '@/features/chat/chatSlice';
import { addMessageNotification, setLikeNotification } from '@/features/realtime/rtmSlice';

export function useSocket() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?._id) {
      dispatch(setSocket(null));
      return;
    }

    const socket = createSocket(user._id);
    dispatch(setSocket(socket));

    socket.on('getOnlineUsers', (onlineUsers: string[]) => {
      dispatch(setOnlineUsers(onlineUsers));
    });

    socket.on('notification', (notification) => {
      dispatch(setLikeNotification(notification));
    });

    socket.on('messageNotification', (notification) => {
      dispatch(addMessageNotification(notification));
    });

    return () => {
      socket.close();
      dispatch(setSocket(null));
    };
  }, [dispatch, user?._id]);
}
