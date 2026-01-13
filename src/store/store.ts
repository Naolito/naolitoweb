import { create } from 'zustand'
import type { Project, TeamMember, Service, ContactInfo, StudioInfo } from '../types'

// Mock data - will be replaced with Supabase calls in the future
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Netflix Holiday Campaign',
    description: 'Character animation and visual development for Netflix\'s global holiday campaign featuring original characters and festive storytelling.',
    category: 'Character Design',
    thumbnailUrl: 'https://picsum.photos/seed/netflix/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    images: [
      'https://picsum.photos/seed/netflix1/1200/800',
      'https://picsum.photos/seed/netflix2/1200/800',
    ],
    client: 'Netflix',
    year: 2024,
    featured: true,
  },
  {
    id: '2',
    title: 'PlayStation 5 Launch Spot',
    description: '3D character animation for PlayStation 5 console launch commercial showcasing next-gen gaming experiences.',
    category: '3D Animation',
    thumbnailUrl: 'https://picsum.photos/seed/playstation/800/600',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    images: [
      'https://picsum.photos/seed/ps1/1200/800',
      'https://picsum.photos/seed/ps2/1200/800',
    ],
    client: 'PlayStation',
    year: 2023,
    featured: true,
  },
  {
    id: '3',
    title: 'Amazon Prime Series Titles',
    description: 'Motion graphics and title sequence design for Amazon Prime Video original series with dynamic typography.',
    category: 'Motion Graphics',
    thumbnailUrl: 'https://picsum.photos/seed/amazon/800/600',
    images: [
      'https://picsum.photos/seed/amazon1/1200/800',
    ],
    client: 'Amazon',
    year: 2024,
    featured: true,
  },
  {
    id: '4',
    title: 'Disney+ Character Development',
    description: 'Character design and animation development for Disney+ exclusive animated content with magical storytelling.',
    category: '2D Animation',
    thumbnailUrl: 'https://picsum.photos/seed/disney/800/600',
    images: [
      'https://picsum.photos/seed/disney1/1200/800',
    ],
    client: 'Disney',
    year: 2023,
    featured: true,
  },
  {
    id: '5',
    title: 'Nestlé Product Campaign',
    description: 'Character-driven commercial animation for Nestlé product line launch featuring engaging brand mascots.',
    category: 'Character Design',
    thumbnailUrl: 'https://picsum.photos/seed/nestle/800/600',
    images: [
      'https://picsum.photos/seed/nestle1/1200/800',
    ],
    client: 'Nestlé',
    year: 2024,
    featured: true,
  },
  {
    id: '6',
    title: 'Amazon Alexa Voice Assistant',
    description: 'Explainer animation showcasing Alexa features with engaging character storytelling and modern design.',
    category: 'Explainer Videos',
    thumbnailUrl: 'https://picsum.photos/seed/alexa/800/600',
    images: [
      'https://picsum.photos/seed/alexa1/1200/800',
    ],
    client: 'Amazon',
    year: 2023,
    featured: true,
  },
  {
    id: '7',
    title: 'Tech Startup Brand Video',
    description: 'High-energy motion graphics showcase for a Silicon Valley tech startup featuring bold colors and modern aesthetics.',
    category: 'Motion Graphics',
    thumbnailUrl: 'https://picsum.photos/seed/techstartup/800/600',
    images: [
      'https://picsum.photos/seed/tech1/1200/800',
    ],
    year: 2024,
    featured: false,
  },
  {
    id: '8',
    title: 'Environmental Documentary',
    description: '2D animated sequences for nature documentary series with beautiful hand-drawn illustrations.',
    category: '2D Animation',
    thumbnailUrl: 'https://picsum.photos/seed/envdoc/800/600',
    images: [
      'https://picsum.photos/seed/env1/1200/800',
    ],
    year: 2023,
    featured: false,
  },
]

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Creative Director',
    bio: 'Award-winning director with 15 years of experience in animation and visual storytelling.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Lead 3D Animator',
    bio: 'Specialized in character animation and rigging with work featured in major studios.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      portfolio: 'https://example.com',
    },
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Motion Graphics Artist',
    bio: 'Expert in creating dynamic motion graphics and visual effects for brands and media.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    socialLinks: {
      instagram: 'https://instagram.com',
      portfolio: 'https://example.com',
    },
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Character Designer',
    bio: 'Creating memorable characters for animation, games, and entertainment properties.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    socialLinks: {
      instagram: 'https://instagram.com',
    },
  },
]

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Character Animation',
    description: 'Our specialty: creating memorable character performances that bring stories to life with personality and emotion.',
    icon: 'UserGroupIcon',
    features: [
      'Character design and development',
      '2D & 3D character animation',
      'Facial animation and lip sync',
      'Character rigging and technical setup',
    ],
  },
  {
    id: '2',
    title: 'Commercial Animation',
    description: 'High-impact animated commercials that capture attention and drive results for global brands.',
    icon: 'SparklesIcon',
    features: [
      'Concept development',
      'Brand character creation',
      'Campaign animation',
      'Multi-platform delivery',
    ],
  },
  {
    id: '3',
    title: '3D Animation & Modeling',
    description: 'Photorealistic and stylized 3D animation for entertainment, advertising, and product visualization.',
    icon: 'CubeIcon',
    features: [
      '3D character modeling and animation',
      'Environment and prop design',
      'Product visualization',
      'Rendering and compositing',
    ],
  },
  {
    id: '4',
    title: 'Motion Graphics',
    description: 'Dynamic motion design for title sequences, branding, and digital content that stands out.',
    icon: 'BoltIcon',
    features: [
      'Title sequence design',
      'Logo animation',
      'Broadcast graphics',
      'UI/UX animation',
    ],
  },
  {
    id: '5',
    title: '2D Animation',
    description: 'Hand-crafted 2D animation with artistic flair for series, shorts, and commercial content.',
    icon: 'PencilIcon',
    features: [
      'Traditional animation',
      'Digital 2D animation',
      'Illustration and design',
      'Storyboarding',
    ],
  },
  {
    id: '6',
    title: 'Visual Development',
    description: 'Complete visual storytelling from concept to final style frames for animation projects.',
    icon: 'LightBulbIcon',
    features: [
      'Concept art and design',
      'Style exploration',
      'Color scripts',
      'Visual storytelling',
    ],
  },
]

const mockContactInfo: ContactInfo = {
  email: 'hello@naolito.studio',
  phone: '+1 (555) 626-5486',
  address: '123 Creative District, Los Angeles, CA 90028',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/naolito',
    twitter: 'https://twitter.com/naolitostudio',
    instagram: 'https://instagram.com/naolitostudio',
    youtube: 'https://youtube.com/@naolito',
    vimeo: 'https://vimeo.com/naolito',
  },
}

const mockStudioInfo: StudioInfo = {
  name: 'Naolito',
  tagline: 'Crafting Compelling Animated Stories',
  description: 'A boutique animation studio creating character-driven content for leading global brands. We combine creative excellence with technical expertise to deliver animation that engages and inspires.',
  heroVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  stats: {
    projectsCompleted: 50,
    happyClients: 15,
    yearsExperience: 8,
    teamMembers: 20,
  },
}

// Store interface
interface StoreState {
  // Data
  projects: Project[]
  teamMembers: TeamMember[]
  services: Service[]
  contactInfo: ContactInfo
  studioInfo: StudioInfo
  
  // Loading states
  isLoading: boolean
  error: string | null
  
  // Actions - these will integrate with Supabase in the future
  fetchProjects: () => Promise<void>
  fetchTeamMembers: () => Promise<void>
  fetchServices: () => Promise<void>
  fetchContactInfo: () => Promise<void>
  fetchStudioInfo: () => Promise<void>
  
  // Filters
  filterProjectsByCategory: (category: string | null) => Project[]
  getFeaturedProjects: () => Project[]
}

// Create the store
export const useStore = create<StoreState>((set, get) => ({
  // Initial state
  projects: mockProjects,
  teamMembers: mockTeamMembers,
  services: mockServices,
  contactInfo: mockContactInfo,
  studioInfo: mockStudioInfo,
  isLoading: false,
  error: null,
  
  // Actions - currently return mock data, will be replaced with Supabase calls
  fetchProjects: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Replace with Supabase query
      // const { data, error } = await supabase.from('projects').select('*')
      // if (error) throw error
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ projects: mockProjects, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  
  fetchTeamMembers: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Replace with Supabase query
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ teamMembers: mockTeamMembers, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  
  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Replace with Supabase query
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ services: mockServices, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  
  fetchContactInfo: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Replace with Supabase query
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ contactInfo: mockContactInfo, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  
  fetchStudioInfo: async () => {
    set({ isLoading: true, error: null })
    try {
      // TODO: Replace with Supabase query
      await new Promise(resolve => setTimeout(resolve, 500))
      set({ studioInfo: mockStudioInfo, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  
  // Filter functions
  filterProjectsByCategory: (category: string | null) => {
    const { projects } = get()
    if (!category) return projects
    return projects.filter(project => project.category === category)
  },
  
  getFeaturedProjects: () => {
    const { projects } = get()
    return projects.filter(project => project.featured)
  },
}))

