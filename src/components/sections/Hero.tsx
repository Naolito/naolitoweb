import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import heroBanner from '../../../media/hero-banner.png'

const heroReelSource = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f8fbff]">
      <Reveal>
        <div className="relative w-full min-h-[560px] md:min-h-[700px] lg:min-h-[820px] overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={heroBanner}
            className="absolute inset-0 w-full h-full object-cover opacity-[0.42]"
          >
            <source src={heroReelSource} type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(248,251,255,0.98) 0%, rgba(248,251,255,0.84) 26%, rgba(248,251,255,0.22) 54%, rgba(248,251,255,0.00) 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/14 via-transparent to-white/38" />
          <div className="absolute -top-24 right-[-10%] w-[420px] h-[420px] bg-sky-300/25 rounded-full blur-[160px]" />
          <div className="absolute -bottom-24 left-[-12%] w-[440px] h-[440px] bg-rose-300/20 rounded-full blur-[180px]" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="flex min-h-[560px] md:min-h-[700px] lg:min-h-[820px] items-center">
              <div className="w-full max-w-3xl py-14 md:py-18 lg:py-24">
                <h1 className="text-balance text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-slate-900 leading-[0.95]">
                  Award winning
                  <span className="block bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                    animation studio
                  </span>
                </h1>

                <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl leading-relaxed">
                  Our films have been celebrated at international festivals, and we collaborate with clients all over
                  the world, from global brands to ambitious startups and creator-led teams. We bring big-studio
                  craft with a playful spirit, turning every brief into a story people feel, share, and remember.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/contact">
                    <Button variant="primary" size="lg">
                      Start a Project
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export default Hero
