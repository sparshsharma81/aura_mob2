import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  socket: any | null;
}

const initialState: SocketState = {
  socket: null
};

const socketSlice = createSlice({
  name: 'socketio',
  initialState,
  reducers: {
    setSocket(state, action: PayloadAction<any | null>) {
      state.socket = action.payload;
    }
  }
});

export const { setSocket } = socketSlice.actions;
export default socketSlice.reducer;
