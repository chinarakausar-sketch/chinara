export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface Message {
  id: string;
  role: Role;
  text: string;
  timestamp: number;
  isError?: boolean;
}

export enum View {
  HOME = 'home',
  CHAT = 'chat',
  ANALYZER = 'analyzer',
  KNOWLEDGE = 'knowledge'
}

export interface FraudCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string;
}