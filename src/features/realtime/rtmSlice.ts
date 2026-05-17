import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NotificationItem } from '@/types/notification';

interface RealtimeState {
  likeNotification: NotificationItem[];
  messageNotifications: NotificationItem[];
}

const initialState: RealtimeState = {
  likeNotification: [],
  messageNotifications: []
};

const rtnSlice = createSlice({
  name: 'realTimeNotification',
  initialState,
  reducers: {
    setLikeNotification(state, action: PayloadAction<NotificationItem>) {
      if (action.payload.type === 'like') {
        state.likeNotification.push(action.payload);
      } else if (action.payload.type === 'dislike') {
        state.likeNotification = state.likeNotification.filter((entry) => entry.userId !== action.payload.userId);
      }
    },
    clearLikeNotifications(state) {
      state.likeNotification = [];
    },
    addMessageNotification(state, action: PayloadAction<NotificationItem>) {
      state.messageNotifications.push(action.payload);
    },
    clearMessageNotifications(state) {
      state.messageNotifications = [];
    }
  }
});

export const { setLikeNotification, clearLikeNotifications, addMessageNotification, clearMessageNotifications } = rtnSlice.actions;
export default rtnSlice.reducer;
