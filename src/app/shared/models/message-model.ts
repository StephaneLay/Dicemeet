import { User } from './user-model';

export interface Message {
  id: number;
  content: string;
  time: string; 
  sender: User;
  meetup?: {
    id: number;
    title: string;
  } | null;
}
