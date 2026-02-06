// Core types for the animation studio website

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  thumbnailUrl: string
  videoUrl?: string
  images: string[]
  client?: string
  year: number
  featured: boolean
}

export type ProjectCategory = 
  | '2D Animation'
  | '3D Animation'
  | 'Motion Graphics'
  | 'Character Design'
  | 'VFX'
  | 'Explainer Videos'

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatarUrl: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    instagram?: string
    portfolio?: string
  }
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    instagram?: string
    tiktok?: string
    facebook?: string
    youtube?: string
    vimeo?: string
  }
}

export interface StudioInfo {
  name: string
  tagline: string
  description: string
  heroVideoUrl: string
  stats: {
    projectsCompleted: number
    happyClients: number
    yearsExperience: number
    teamMembers: number
  }
}
