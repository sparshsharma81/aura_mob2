import type { User } from './user';

export interface AuthState {
  user: User | null;
  suggestedUsers: User[];
  userProfile: User | null;
  selectedUser: User | null;
}
