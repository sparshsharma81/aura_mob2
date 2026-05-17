import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Message } from '@/types/chat';

interface ChatState {
  onlineUsers: string[];
  messages: Message[];
  typingUsers: Record<string, boolean>;
}

const initialState: ChatState = {
  onlineUsers: [],
  messages: [],
  typingUsers: {}
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setOnlineUsers(state, action: PayloadAction<string[]>) {
      state.onlineUsers = action.payload;
    },
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload;
    },
    addOrUpdateMessage(state, action: PayloadAction<{ message: Message; tempId?: string }>) {
      const { message, tempId } = action.payload;

      if (message._id) {
        const index = state.messages.findIndex((entry) => entry._id === message._id);
        if (index !== -1) {
          state.messages[index] = { ...state.messages[index], ...message };
          return;
        }
      }

      if (tempId) {
        const index = state.messages.findIndex((entry) => entry.tempId === tempId);
        if (index !== -1) {
          state.messages[index] = { ...state.messages[index], ...message };
          return;
        }
      }

      state.messages.push(message);
    },
    setTypingUsers(state, action: PayloadAction<{ userId: string; typing: boolean }>) {
      const { userId, typing } = action.payload;
      if (typing) {
        state.typingUsers[userId] = true;
      } else {
        delete state.typingUsers[userId];
      }
    }
  }
});

export const { setOnlineUsers, setMessages, addOrUpdateMessage, setTypingUsers } = chatSlice.actions;
export default chatSlice.reducer;
