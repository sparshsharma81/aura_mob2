import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/authSlice';
import postReducer from '@/features/posts/postSlice';
import chatReducer from '@/features/chat/chatSlice';
import socketReducer from '@/features/socket/socketSlice';
import realtimeReducer from '@/features/realtime/rtmSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  chat: chatReducer,
  socketio: socketReducer,
  realTimeNotification: realtimeReducer
});

export type RootState = ReturnType<typeof rootReducer>;
