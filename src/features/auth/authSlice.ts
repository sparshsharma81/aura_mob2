import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '@/types/auth';
import type { User } from '@/types/user';

const initialState: AuthState = {
  user: null,
  suggestedUsers: [],
  userProfile: null,
  selectedUser: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setSuggestedUsers(state, action: PayloadAction<User[]>) {
      state.suggestedUsers = action.payload;
    },
    setUserProfile(state, action: PayloadAction<User | null>) {
      state.userProfile = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<User | null>) {
      state.selectedUser = action.payload;
    }
  }
});

export const { setAuthUser, setSuggestedUsers, setUserProfile, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
