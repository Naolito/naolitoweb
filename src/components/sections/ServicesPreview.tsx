import { Link } from 'react-router-dom'

const services = [
  {
    number: '01',
    title: 'Character Animation',
    description: 'Bringing characters to life with personality and emotion.',
    link: '/services',
  },
  {
    number: '02',
    title: 'Motion Graphics',
    description: 'Dynamic visuals for brands, titles, and digital content.',
    link: '/services',
  },
  {
    number: '03',
    title: '3D Animation',
    description: 'Immersive 3D worlds and photorealistic renders.',
    link: '/services',
  },
  {
    number: '04',
    title: 'Viral Content',
    description: 'Social-first content designed to spread.',
    link: '/services',
  },
]

const ServicesPreview = () => {
  return (
    <section className="py-24 md:py-32 bg-gray-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-sm font-bold text-primary-400 uppercase tracking-widest mb-4 block">
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
            Full-Service
            <br />
            Animation Studio
          </h2>
          <p className="text-xl text-gray-400">
            From concept to viral content, we handle every aspect of animation production.
          </p>
        </div>

        {/* Services List */}
        <div className="border-t border-white/10">
          {services.map((service) => (
            <Link 
              key={service.number}
              to={service.link}
              className="group block border-b border-white/10 py-8 md:py-12"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <span className="text-sm text-primary-400 font-mono">{service.number}</span>
                <h3 className="text-2xl md:text-4xl font-display font-bold group-hover:text-primary-400 transition-colors flex-1">
                  {service.title}
                </h3>
                <p className="text-gray-500 md:max-w-xs md:text-right">
                  {service.description}
                </p>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                  <svg className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-6">
          <Link 
            to="/services"
            className="inline-flex items-center gap-2 text-lg font-medium text-white hover:text-primary-400 transition-colors"
          >
            Explore All Services
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <span className="text-gray-600">or</span>
          <Link 
            to="/contact"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServicesPreview

