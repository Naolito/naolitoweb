import { useMemo, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FeaturedBento from '../components/sections/FeaturedBento'
import ProjectMasonry from '../components/sections/ProjectMasonry'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../store/store'
import type { ProjectCategory } from '../types'

const Portfolio = () => {
  const projects = useStore((state) => state.projects)
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All')

  const categoryList = useMemo(() => {
    const dynamicCategories = Array.from(new Set(projects.map((p) => p.category)))
    return ['All', ...dynamicCategories] as Array<ProjectCategory | 'All'>
  }, [projects])

  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length }
    for (const project of projects) {
      counts[project.category] = (counts[project.category] || 0) + 1
    }
    return counts
  }, [projects])

  const filteredProjects = useMemo(
    () =>
      selectedCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === selectedCategory),
    [projects, selectedCategory],
  )

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured),
    [projects],
  )

  const showFeatured = selectedCategory === 'All'

  return (
    <div className="min-h-screen bg-[#f8fbff]">
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Intro text */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-14">
          <Reveal>
            <h1 className="text-4xl font-display font-semibold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
              Our work
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
              Every project starts with a story. From there we design characters, build worlds,
              and craft motion that serves the narrative across any format or platform. Our
              production pipeline covers 2D and 3D animation, character design, visual
              development, editorial illustration, motion graphics, visual effects, and full
              compositing, all handled by one team so the creative vision stays consistent from
              first sketch to final delivery.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Beyond traditional production, we create interactive experiences including in-game
              assets, playable ads, and mobile applications where animation meets performance
              marketing. We also produce platform-native social content, short-form series, and
              viral campaigns designed to convert attention into community.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              One studio, one pipeline, built for speed without compromising craft. Browse our
              selected work below and click any project to see the full story behind it.
            </p>
          </Reveal>
        </div>

        {/* Filter pills */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="flex flex-wrap gap-2">
            {categoryList.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-[0_4px_20px_rgba(15,23,42,0.15)]'
                    : 'border border-black/10 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {category}
                <span
                  className={`text-[10px] tabular-nums ${
                    selectedCategory === category ? 'text-white/50' : 'text-slate-400'
                  }`}
                >
                  {projectCounts[category] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {showFeatured && <FeaturedBento projects={featuredProjects} />}

        <ProjectMasonry projects={filteredProjects} />
      </main>

      <Footer />
    </div>
  )
}

export default Portfolio
