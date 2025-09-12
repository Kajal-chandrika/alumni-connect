export type Role = "alumni" | "student" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  token?: string;
}

export interface AlumniProfile {
  alumni_id: number;
  user_id: number;
  phone?: string;
  graduation_year?: number;
  department?: string;
  location?: string;
  linkedin_url?: string;
}

export interface Education {
  edu_id: number;
  alumni_id: number;
  degree?: string;
  institution?: string;
  start_year?: number;
  end_year?: number;
}

export interface WorkExperience {
  work_id: number;
  alumni_id: number;
  company?: string;
  role?: string;
  start_date?: string;
  end_date?: string | null;
}

export interface Event {
  event_id: number;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  created_by: number;
}

export interface Job {
  job_id: number;
  posted_by: number;
  title: string;
  company: string;
  description?: string;
  location?: string;
  type: "job" | "internship";
  posted_at: string;
}

export interface Donation {
  donation_id: number;
  alumni_id: number;
}
