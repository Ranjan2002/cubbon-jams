export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  address: string;
  image: string;
  category: "jam" | "open-mic" | "concert" | "workshop";
  performers?: string[];
  capacity?: number;
  registered?: number;
  isPast?: boolean;
  featured?: boolean;
  bookingUrl?: string;
}

export interface GalleryItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title: string;
  event?: string;
  date: string;
  category: "acoustic" | "band" | "open-mic" | "workshop" | "all";
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface CommunityMember {
  id: string;
  name: string;
  email: string;
  instrument: string;
  experience: "beginner" | "intermediate" | "advanced" | "professional";
  message?: string;
  joinedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}
