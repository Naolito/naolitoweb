import Card from './Card'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card padding="none" hoverable>
      <div className="relative group">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-gray-900">
          <img
            src={project.thumbnailUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/project-${project.id}/1200/800`
            }}
          />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white">
            {project.category}
          </div>
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4">
            {project.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              {project.client && (
                <span className="text-gray-500">
                  {project.client}
                </span>
              )}
              <span className="text-gray-600">•</span>
              <span className="text-gray-500">{project.year}</span>
            </div>
            
            {project.featured && (
              <span className="flex items-center text-yellow-500">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
