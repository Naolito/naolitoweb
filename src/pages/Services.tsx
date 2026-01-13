import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useStore } from '../store/store'
import { Link } from 'react-router-dom'

const Services = () => {
  const services = useStore((state) => state.services)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Page Header */}
          <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-900/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
                Services
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive animation solutions from concept to final delivery
              </p>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20 bg-gray-900/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <Card key={service.id} hoverable className="animate-fade-in group">
                    <div className="space-y-6">
                      {/* Icon placeholder with gradient */}
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-600/20 flex items-center justify-center border border-primary-500/20 group-hover:border-primary-500/40 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-purple-600" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-display font-bold text-white">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed">
                        {service.description}
                      </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <svg
                            className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-b from-gray-900/50 to-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full blur-3xl" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                  Let's Create Something Exceptional
                </h2>
                <p className="text-xl text-gray-400">
                  Partner with Naolito to bring your next animation project to life with the same quality trusted by Netflix, Amazon, and Disney
                </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg">
                    Get in Touch
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button variant="outline" size="lg">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Services

