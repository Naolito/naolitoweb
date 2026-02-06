import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import heroBanner from '../../../media/hero-banner.png'

const disneyHomeworkUrl =
  'https://www.disneyplus.com/es-es/browse/entity-0ec21290-1b35-4f89-88a1-39aa1dd726e2'

const HomeworkDisney = () => {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <img
        src={heroBanner}
        alt="Homework animated short now streaming on Disney Plus"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(56,189,248,0.25),transparent_40%),radial-gradient(circle_at_88%_80%,rgba(129,140,248,0.25),transparent_42%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-slate-950/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Now streaming</div>
            <h2 className="mt-5 text-5xl font-semibold leading-[0.94] text-white md:text-6xl lg:text-7xl">
              Homework is now on
              <span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                Disney+
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200/90">
              Our animated short is part of the official catalog. Watch the full piece in top quality directly on
              Disney+.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={disneyHomeworkUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Watch on Disney+
                </Button>
              </a>
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-100">
                Official release
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default HomeworkDisney
