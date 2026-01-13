import { Link } from 'react-router-dom'
import { useStore } from '../../store/store'
import Button from '../ui/Button'

const FeaturedProjects = () => {
  const getFeaturedProjects = useStore((state) => state.getFeaturedProjects)
  const featuredProjects = getFeaturedProjects().slice(0, 5)

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white leading-tight">
              Featured
              <br />
              Projects
            </h2>
          </div>
          <Link to="/portfolio">
            <Button variant="outline" size="lg">
              View All Work
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Button>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {/* Large Featured Project */}
          {featuredProjects[0] && (
            <Link 
              to="/portfolio" 
              className="col-span-12 lg:col-span-8 group"
            >
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-3xl">
                <img
                  src={featuredProjects[0].thumbnailUrl}
                  alt={featuredProjects[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${featuredProjects[0].id}/1200/800`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mb-4">
                    {featuredProjects[0].category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                    {featuredProjects[0].title}
                  </h3>
                  <p className="text-gray-300 max-w-xl hidden md:block">
                    {featuredProjects[0].description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    {featuredProjects[0].client && <span>{featuredProjects[0].client}</span>}
                    <span>•</span>
                    <span>{featuredProjects[0].year}</span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Side Projects Stack */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 md:gap-6">
            {featuredProjects.slice(1, 3).map((project) => (
              <Link 
                key={project.id}
                to="/portfolio" 
                className="group flex-1"
              >
                <div className="relative h-[200px] md:h-full min-h-[200px] overflow-hidden rounded-3xl">
                  <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `https://picsum.photos/seed/${project.id}/800/600`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mt-1 group-hover:text-primary-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Row */}
          {featuredProjects.slice(3, 5).map((project, idx) => (
            <Link 
              key={project.id}
              to="/portfolio" 
              className={`col-span-12 md:col-span-6 group`}
            >
              <div className="relative h-[300px] overflow-hidden rounded-3xl">
                <img
                  src={project.thumbnailUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${project.id}/800/600`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs text-primary-400 font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-1 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.client && (
                    <span className="text-sm text-gray-400 mt-2 block">{project.client}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
