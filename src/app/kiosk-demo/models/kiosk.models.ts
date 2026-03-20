export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  note: string;
}

export interface ScheduleSlot {
  day: string;
  time: string;
  room: string;
}

export interface Teacher {
  name: string;
  role: string;
  bio: string;
  portrait: string;
}

export interface EventMediaAsset {
  id: string;
  title: string;
  type: 'image' | 'video';
  thumbnail: string;
  description: string;
  source: string;
  category: 'photo' | 'video' | 'cover' | 'presentation' | 'backstage';
  featured?: boolean;
}

export interface LevelEvent {
  id: string;
  name: string;
  year: string;
  summary: string;
  coverImage: string;
  media: EventMediaAsset[];
}

export interface GroupLevel {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  schedules: ScheduleSlot[];
  dances: string[];
  teacher: Teacher;
  events: LevelEvent[];
}

export interface InterestGroup {
  id: string;
  name: string;
  audience: string;
  tagline: string;
  description: string;
  accent: string;
  coverImage: string;
  levels: GroupLevel[];
}

export type DetailTab = 'info' | 'gallery';
