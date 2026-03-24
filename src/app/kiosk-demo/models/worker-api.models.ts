export interface WorkerBranchDto {
  id: number;
  slug: string;
  name: string;
  address: string | null;
  description: string | null;
  qrImageUrl: string | null;
  contacts?: WorkerBranchContactDto[];
  slides?: { src: string; alt: string; badge: string }[];
}

export interface WorkerBranchContactDto {
  id: number;
  contactType: 'whatsapp' | 'phone' | 'facebook' | 'instagram' | 'maps' | 'web';
  label: string | null;
  value: string | null;
  url: string | null;
}

export interface WorkerTeacherDto {
  id: number;
  fullName: string;
  bio: string | null;
  photoUrl: string | null;
  role?: string | null;
  isMain?: boolean;
}

export interface WorkerDanceDto {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  originRegion: string | null;
}

export interface WorkerScheduleDto {
  id: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  roomName: string | null;
  notes: string | null;
}

export interface WorkerMediaDto {
  id: number;
  fileUrl: string;
  fileType: 'image' | 'video';
  title: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  durationSeconds: number | null;
  altText: string | null;
  mediaCategory?: 'photo' | 'video' | 'cover' | 'backstage' | 'presentation' | null;
  isFeatured?: boolean;
}

export interface WorkerEventDto {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  eventDate: string | null;
  location: string | null;
  coverImageUrl: string | null;
  media: WorkerMediaDto[];
}

export interface WorkerLevelDto {
  id: number;
  slug: string;
  name: string;
  shortDescription: string | null;
  fullDescription: string | null;
  ageRange: string | null;
  minAge: number | null;
  maxAge: number | null;
  coverImageUrl: string | null;
  schedules: WorkerScheduleDto[];
  dances: WorkerDanceDto[];
  teachers: WorkerTeacherDto[];
  events: WorkerEventDto[];
}

export interface WorkerGroupDto {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  status: 'active' | 'inactive' | 'upcoming' | 'finished';
  startDate: string | null;
  endDate: string | null;
  groupType: {
    id: number;
    slug: string;
    name: string;
    description: string | null;
  };
  branch: WorkerBranchDto;
  levels: WorkerLevelDto[];
}
