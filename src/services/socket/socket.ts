import { io, type Socket } from 'socket.io-client';
import { SOCKET_URL } from '@/config/env';

export function createSocket(userId: string) {
  return io(SOCKET_URL, {
    query: { userId },
    transports: ['websocket']
  }) as Socket;
}
