import { create } from 'zustand'
import type { Project, TeamMember, Service, ContactInfo, StudioInfo } from '../types'
import { mockProjectImages } from './mockData'

// Mock data - will be replaced with Supabase calls in the future
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Netflix Holiday Campaign',
    description: 'Full character animation and visual development package for Netflix\'s global holiday campaign. We designed a family of original characters from scratch, developed their personalities and visual language, then produced a suite of animated spots for broadcast, social, and in-app placements across 24 territories. The project ran from initial concept through storyboarding, animation, look development, compositing, and multi-format delivery over a five-month production cycle.',
    category: 'Character Design',
    thumbnailUrl: mockProjectImages.character[0],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    images: Array.from({ length: 64 }, (_, i) =>
      `https://picsum.photos/seed/netflix-${i}/800/600`
    ),
    client: 'Netflix',
    year: 2024,
    featured: true,
  },
  {
    id: '2',
    title: 'PlayStation 5 Launch Spot',
    description: 'Cinematic 3D character animation for the PlayStation 5 console launch. We built stylized hero characters in full CG, rigged and animated them through high-energy action sequences, and delivered a sixty-second hero spot plus fifteen-second cutdowns for digital and broadcast. The pipeline included character modeling, environment design, lighting, FX simulations, and final compositing with a tight turnaround to hit the global launch window.',
    category: '3D Animation',
    thumbnailUrl: mockProjectImages.animation3d[0],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    images: [
      mockProjectImages.animation3d[1],
      mockProjectImages.animation3d[2],
      mockProjectImages.character[0],
      mockProjectImages.motion[2],
    ],
    client: 'PlayStation',
    year: 2023,
    featured: true,
  },
  {
    id: '3',
    title: 'Amazon Prime Series Titles',
    description: 'Motion graphics and title sequence design for an Amazon Prime Video original series. We developed a dynamic typographic system that adapts across episodes while keeping a consistent visual identity. The work covered concept exploration, style frames, full animation of the opening titles, episode cards, and end credits, all delivered with editorial-grade timing synced to the composer\'s score.',
    category: 'Motion Graphics',
    thumbnailUrl: mockProjectImages.motion[0],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    images: [
      mockProjectImages.motion[1],
      mockProjectImages.motion[2],
      mockProjectImages.explainer[0],
    ],
    client: 'Amazon',
    year: 2024,
    featured: true,
  },
  {
    id: '4',
    title: 'Homework Animated Short',
    description: 'Our debut original short film, funded through Kickstarter and produced entirely in-house. Homework tells the story of a child\'s imagination colliding with everyday routine through full 3D animation with a handcrafted aesthetic. The production covered every stage: script, character design, storyboard, layout, animation, FX, look development, original score, sound design, and final compositing. The film screened at festivals worldwide and is now streaming on Disney+.',
    category: '3D Animation',
    thumbnailUrl: mockProjectImages.animation3d[1],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    images: [
      mockProjectImages.animation3d[2],
      mockProjectImages.animation3d[0],
      mockProjectImages.animation2d[1],
      mockProjectImages.character[2],
    ],
    year: 2024,
    featured: true,
  },
  {
    id: '5',
    title: 'Nestlé Product Campaign',
    description: 'Character-driven commercial animation for Nestlé\'s product line launch. We created a cast of brand mascots from initial sketches through final rigged models, then animated a hero thirty-second TV spot and a series of six-second social cutdowns. The visual development phase included color scripts, environment concepts, and style exploration to lock a warm, approachable look that aligned with the brand\'s family-friendly positioning.',
    category: 'Character Design',
    thumbnailUrl: mockProjectImages.character[1],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    images: [
      mockProjectImages.character[2],
      mockProjectImages.character[0],
      mockProjectImages.explainer[1],
    ],
    client: 'Nestlé',
    year: 2024,
    featured: true,
  },
  {
    id: '6',
    title: 'Amazon Alexa Voice Assistant',
    description: 'Explainer animation series for Amazon Alexa, designed to showcase product features through character-led storytelling. We developed a friendly guide character and built a modular animation system that allowed rapid production of twelve episodes covering different Alexa capabilities. Each episode combined 2D character animation with motion graphics overlays and screen recordings, delivered in landscape and vertical formats for web, social, and in-app placement.',
    category: 'Explainer Videos',
    thumbnailUrl: mockProjectImages.explainer[0],
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    images: [
      mockProjectImages.explainer[1],
      mockProjectImages.explainer[2],
      mockProjectImages.motion[0],
    ],
    client: 'Amazon',
    year: 2023,
    featured: true,
  },
  {
    id: '7',
    title: 'Tech Startup Brand Video',
    description: 'High-energy motion graphics showcase for a Series B tech startup. The brief called for a two-minute brand film that could live on the homepage, play at investor events, and cut into social assets. We designed a bold graphic language with custom iconography, kinetic typography, and data visualizations, all animated to an upbeat soundtrack. The project included three rounds of style exploration, full storyboard, and delivery in 4K with subtitle variants for five markets.',
    category: 'Motion Graphics',
    thumbnailUrl: mockProjectImages.motion[2],
    images: [
      mockProjectImages.motion[0],
      mockProjectImages.motion[1],
      mockProjectImages.explainer[0],
      mockProjectImages.animation2d[2],
    ],
    year: 2024,
    featured: false,
  },
  {
    id: '8',
    title: 'Environmental Documentary',
    description: '2D animated sequences for a six-part nature documentary series. We produced hand-drawn illustrations and frame-by-frame animation to visualize ecological processes that cameras cannot capture: deep-ocean currents, root systems, and microscopic pollination cycles. Each episode featured two to three animated segments ranging from thirty seconds to two minutes, all rendered in a watercolor-inspired style that complemented the live-action photography.',
    category: '2D Animation',
    thumbnailUrl: mockProjectImages.animation2d[2],
    images: [
      mockProjectImages.animation2d[0],
      mockProjectImages.animation2d[1],
      mockProjectImages.character[1],
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
  email: 'contact@naolito.com',
  phone: '+34 601259578',
  address: 'Sor Teresa Prat 15, Malaga 29003',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/naolito-animation-studios?originalSubdomain=es',
    instagram: 'https://instagram.com/naolito',
    tiktok: 'https://tiktok.com/@naolitok',
    facebook: 'https://facebook.com/naolito',
    youtube: 'https://youtube.com/naolito',
    vimeo: 'https://vimeo.com/naolito',
  },
}

const mockStudioInfo: StudioInfo = {
  name: 'Naolito',
  tagline: 'The Cute Side of Life',
  description: 'From pop-culture illustrations to award-winning animation. Naolito is the creative studio of Nacho Diaz Arjona, based in M\u00E1laga, Spain. We create character-driven content for global brands and develop original IPs, powered by Blender and a love for storytelling.',
  heroVideoUrl: 'https://www.youtube.com/watch?v=fYEhOIsUYjA',
  stats: {
    projectsCompleted: 50,
    happyClients: 15,
    yearsExperience: 16,
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
