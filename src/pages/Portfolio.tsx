import { useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProjectCard from '../components/ui/ProjectCard'
import Button from '../components/ui/Button'
import { useStore } from '../store/store'
import type { ProjectCategory } from '../types'

const Portfolio = () => {
  const projects = useStore((state) => state.projects)
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All')

  const categories: Array<ProjectCategory | 'All'> = [
    'All',
    '2D Animation',
    '3D Animation',
    'Motion Graphics',
    'Character Design',
    'VFX',
    'Explainer Videos',
  ]

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
          <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-900/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Our Work
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Character-driven animation for the world's most recognized brands
              </p>
            </div>
          </section>

        {/* Filters */}
        <section className="py-8 bg-gray-900/50 sticky top-20 z-40 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="animate-fade-in">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Portfolio

