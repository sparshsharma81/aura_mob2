import type { User } from './user';

export interface NotificationItem {
  type: 'like' | 'comment' | 'message';
  userId: string;
  userDetails?: Pick<User, '_id' | 'username' | 'profilePicture'>;
  postId?: string;
  conversationId?: string;
  message: string;
  text?: string;
}
