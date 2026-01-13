import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'

const FeaturedProjects = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const getFeaturedProjects = useStore((state) => state.getFeaturedProjects)
  const featuredProjects = getFeaturedProjects().slice(0, 6)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative py-24 md:py-32 bg-gray-950 overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Gradient Orbs - Same tones as Hero */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary-500/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-accent-500/15 rounded-full blur-[180px] pointer-events-none" />
      
      {/* Diagonal Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.02]">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.5) 100px, rgba(255,255,255,0.5) 101px)',
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
              Featured Projects
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
              aria-label="Previous projects"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all"
              aria-label="Next projects"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div 
        ref={scrollRef}
        className="relative z-10 flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Spacer for container alignment */}
        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] hidden lg:block" />
        
        {featuredProjects.map((project, index) => (
          <Link
            key={project.id}
            to="/portfolio"
            className="group flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] snap-start"
          >
            <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg overflow-hidden">
              {/* Image */}
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.src = `https://picsum.photos/seed/project${index}/1200/800`
                }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                {/* Category */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-px bg-primary-500" />
                  <span className="text-primary-400 text-sm font-medium uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-lg max-w-xl mb-6 line-clamp-2 hidden md:block">
                  {project.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {project.client && (
                      <>
                        <span className="text-white font-medium">{project.client}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{project.year}</span>
                  </div>
                  
                  {/* View Project Button */}
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">View Project</span>
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
        
        {/* View All Card */}
        <Link
          to="/portfolio"
          className="group flex-shrink-0 w-[85vw] md:w-[40vw] lg:w-[30vw] snap-start"
        >
          <div className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center gap-6 hover:border-primary-500 hover:bg-white/5 transition-all">
            <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-600 transition-all">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="text-center">
              <span className="text-2xl font-display font-bold text-white block mb-2">View All Work</span>
              <span className="text-gray-500">Explore our complete portfolio</span>
            </div>
          </div>
        </Link>

        {/* Spacer for container alignment */}
        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] hidden lg:block" />
      </div>

      {/* Progress Dots */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-center gap-2">
          {featuredProjects.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-white/20 hover:bg-primary-500 transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
