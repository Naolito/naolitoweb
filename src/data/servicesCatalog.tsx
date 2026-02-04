export const pipelineSteps = [
  'Idea',
  'Character Design',
  'Storyboard',
  'Layout',
  'Blocking',
  'Spline',
  'FX',
  'Lookdev',
  'Music',
  'SFX',
  'Compositing',
  'Release',
]

export const serviceGroups = [
  {
    title: 'Production',
    items: [
      {
        title: '2D Animation',
        description: 'Hand-crafted 2D animation with warmth, timing, and charm.',
        link: '/services',
        tone: 'from-sky-100 to-cyan-100 text-sky-600 border-sky-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M8 9h6M8 13h8" />
          </svg>
        ),
      },
      {
        title: '3D Animation',
        description: 'Immersive 3D worlds and photorealistic renders.',
        link: '/services',
        tone: 'from-violet-100 to-indigo-100 text-violet-600 border-violet-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73z" />
            <path d="M3.3 7.3 12 12l8.7-4.7" />
            <path d="M12 22V12" />
          </svg>
        ),
      },
      {
        title: 'Character Design',
        description: 'Iconic characters that carry personality and story.',
        link: '/services',
        tone: 'from-emerald-100 to-teal-100 text-emerald-600 border-emerald-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="3.5" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
          </svg>
        ),
      },
      {
        title: 'Visual Development',
        description: 'Style frames, worlds, and art direction to lock the look.',
        link: '/services',
        tone: 'from-amber-100 to-yellow-100 text-amber-700 border-amber-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="9" />
            <circle cx="8" cy="10" r="1" />
            <circle cx="12" cy="8" r="1" />
            <circle cx="16" cy="10" r="1" />
            <circle cx="15" cy="15" r="1.2" />
            <path d="M8 15c1.6 1.6 3.6 2.5 6 2.5" />
          </svg>
        ),
      },
      {
        title: 'Editorial Illustration',
        description: 'Expressive illustration for story-driven campaigns.',
        link: '/services',
        tone: 'from-rose-100 to-pink-100 text-rose-600 border-rose-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="14" height="16" rx="2" />
            <path d="M8 8h6M8 12h6M8 16h4" />
            <path d="M18 7l2 2-7 7H11v-2z" />
          </svg>
        ),
      },
      {
        title: 'Visual Effects',
        description: 'Stylized compositing, simulations, and cinematic polish.',
        link: '/services',
        tone: 'from-cyan-100 to-sky-100 text-cyan-700 border-cyan-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 20l6-6" />
            <path d="M14 4l1.5 3.5L19 9l-3.5 1.5L14 14l-1.5-3.5L9 9l3.5-1.5L14 4z" />
          </svg>
        ),
      },
      {
        title: 'Motion Graphics',
        description: 'Dynamic visuals for brands, titles, and digital content.',
        link: '/services',
        tone: 'from-amber-100 to-orange-100 text-amber-600 border-amber-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 15c3-6 6-6 9 0s6 6 9 0" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
        ),
      },
      {
        title: 'Co-Productions',
        description: 'Studio partnerships to scale ambitious animated projects.',
        link: '/services',
        tone: 'from-purple-100 to-fuchsia-100 text-purple-600 border-purple-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="8" cy="12" r="4" />
            <circle cx="16" cy="12" r="4" />
            <path d="M12 8v8" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'Games & Interactive',
    items: [
      {
        title: 'In-Game Assets',
        description: 'High-polish assets, character rigs, and UI motion for games.',
        link: '/services',
        tone: 'from-lime-100 to-emerald-100 text-emerald-700 border-emerald-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="7" width="18" height="10" rx="5" />
            <path d="M8.5 11v2M7.5 12h2" />
            <circle cx="16.5" cy="11.5" r="1" />
            <circle cx="18.5" cy="12.5" r="1" />
          </svg>
        ),
      },
      {
        title: 'Playable Ads',
        description: 'Interactive ad experiences built to convert with game-like fun.',
        link: '/services',
        tone: 'from-rose-100 to-orange-100 text-rose-600 border-rose-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="4" width="14" height="16" rx="2" />
            <path d="M9 9l6 3-6 3z" />
            <circle cx="12" cy="17" r="0.6" />
          </svg>
        ),
      },
      {
        title: 'Mobile Ads',
        description: 'Snackable, high-performance mobile ads built for fast attention.',
        link: '/services',
        tone: 'from-cyan-100 to-blue-100 text-cyan-700 border-cyan-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="2.5" width="10" height="19" rx="2" />
            <rect x="9.5" y="6" width="5" height="6" rx="1" />
            <path d="M10 15h4" />
          </svg>
        ),
      },
      {
        title: 'Mobile Apps',
        description: 'Polished app experiences with motion-led UI and brand personality.',
        link: '/services',
        tone: 'from-sky-100 to-indigo-100 text-sky-700 border-sky-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="7" y="2.5" width="10" height="19" rx="2" />
            <rect x="9" y="6" width="2.5" height="2.5" rx="0.5" />
            <rect x="12.5" y="6" width="2.5" height="2.5" rx="0.5" />
            <rect x="9" y="9.5" width="2.5" height="2.5" rx="0.5" />
            <rect x="12.5" y="9.5" width="2.5" height="2.5" rx="0.5" />
          </svg>
        ),
      },
    ],
  },
  {
    title: 'Social & Growth',
    items: [
      {
        title: 'Social Media Content',
        description: 'Platform-native shorts, series, and cuts built for engagement.',
        link: '/services',
        tone: 'from-sky-100 to-blue-100 text-sky-600 border-sky-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 6h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          </svg>
        ),
      },
      {
        title: 'Viral Content',
        description: 'Social-first content designed to spread.',
        link: '/services',
        tone: 'from-rose-100 to-pink-100 text-rose-600 border-rose-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="6" cy="12" r="2" />
            <circle cx="18" cy="6" r="2" />
            <circle cx="18" cy="18" r="2" />
            <path d="M8 11l7-4" />
            <path d="M8 13l7 4" />
          </svg>
        ),
      },
      {
        title: 'Product Design',
        description: 'Product-led storytelling and launch visuals for digital experiences.',
        link: '/services',
        tone: 'from-indigo-100 to-sky-100 text-indigo-600 border-indigo-200',
        icon: (
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="12" rx="2" />
            <path d="M8 20h8" />
            <path d="M9 12h6" />
          </svg>
        ),
      },
    ],
  },
]
