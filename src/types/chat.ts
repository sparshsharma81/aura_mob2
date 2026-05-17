import type { User } from './user';

export interface Message {
  _id?: string;
  tempId?: string;
  senderId: string;
  receiverId: string;
  message: string;
  status?: 'sending' | 'delivered' | 'failed';
  createdAt?: string;
}

export interface ConversationPreview {
  user: User;
  lastMessage?: Message | null;
}
