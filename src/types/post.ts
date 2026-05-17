import type { User } from './user';

export interface Comment {
  _id: string;
  text: string;
  author: User;
  createdAt?: string;
}

export interface Post {
  _id: string;
  caption?: string;
  image: string;
  author: User;
  likes?: string[];
  comments?: Comment[];
  createdAt?: string;
}
