import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Card from '../components/ui/Card'
import { useStore } from '../store/store'

const About = () => {
  const studioInfo = useStore((state) => state.studioInfo)
  const teamMembers = useStore((state) => state.teamMembers)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
          <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-500 to-accent-600 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                About Naolito
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto">
                A boutique animation studio partnering with the world's leading brands to create character-driven content that resonates
              </p>
            </div>
          </section>

          {/* Studio Story */}
          <section className="py-16 md:py-20 bg-white dark:bg-gray-900/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                    Our Story
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      Founded {studioInfo.stats.yearsExperience} years ago, Naolito has established itself as a boutique animation studio working exclusively with premium global brands.
                    </p>
                    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {studioInfo.description}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-500/10 dark:to-accent-600/10 rounded-2xl p-6 md:p-8 border border-primary-200 dark:border-primary-500/20">
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{studioInfo.stats.projectsCompleted}+</div>
                        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-400">Projects Delivered</div>
                      </div>
                      <div>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{studioInfo.stats.happyClients}+</div>
                        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-400">Premium Clients</div>
                      </div>
                      <div>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{studioInfo.stats.yearsExperience}+</div>
                        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-400">Years Experience</div>
                      </div>
                      <div>
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{studioInfo.stats.teamMembers}+</div>
                        <div className="text-xs md:text-sm text-gray-700 dark:text-gray-400">Team Members</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-10 md:mt-12 max-w-3xl mx-auto">
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    We maintain a selective client roster to ensure every project receives the creative focus and technical excellence it deserves. Our partnerships with industry leaders like Netflix, Amazon, PlayStation, Disney, and Nestlé reflect our commitment to quality and innovation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  Meet Our Team
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full mb-6" />
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-400 max-w-2xl mx-auto">
                  Expert artists and technicians dedicated to crafting exceptional animated content
                </p>
              </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <Card key={member.id} hoverable className="text-center">
                    <div className="space-y-4 p-6">
                      {/* Avatar */}
                      <div className="relative mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary-200 dark:border-primary-500/20">
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div>
                        <h3 className="text-lg md:text-xl font-display font-bold text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                          {member.role}
                        </p>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
                        {member.bio}
                      </p>

                    {/* Social Links */}
                    {member.socialLinks && (
                      <div className="flex items-center justify-center space-x-3 pt-2">
                        {member.socialLinks.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              aria-label={`${member.name}'s LinkedIn`}
                            >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.twitter && (
                            <a
                              href={member.socialLinks.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              aria-label={`${member.name}'s Twitter`}
                            >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.instagram && (
                            <a
                              href={member.socialLinks.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              aria-label={`${member.name}'s Instagram`}
                            >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </a>
                        )}
                        {member.socialLinks.portfolio && (
                            <a
                              href={member.socialLinks.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                              aria-label={`${member.name}'s Portfolio`}
                            >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About

