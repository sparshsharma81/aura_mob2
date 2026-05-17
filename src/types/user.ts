import type { Post } from './post';

export interface User {
  _id: string;
  username: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  gender?: string;
  isPrivate?: boolean;
  followers?: string[];
  following?: string[];
  posts?: string[] | Post[];
}
