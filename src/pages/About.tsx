import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'

const milestones = [
  { year: '2009', title: 'The spark', description: 'Nacho discovers t-shirt design through Pampling and Threadless. First contest win. Naolito is born in Algeciras, southern Spain.' },
  { year: '2012', title: 'Going viral', description: 'Illustrations start gaining traction on DeviantArt and social media. Featured as "Artist of the Week" by design publications.' },
  { year: '2016', title: 'Villains Need Love', description: 'The pop-culture villain series goes massively viral across BoredPanda, DesignTaxi, and hundreds of blogs. Kickstarter art book funded in just 4 days.' },
  { year: '2018', title: 'Physical retail', description: 'Naolito products hit physical shelves. Stockists in Barcelona, Granada, Vigo, Jerez, and stores across Belgium, France, and Italy.' },
  { year: '2020', title: 'The pivot to animation', description: 'COVID lockdown. Physical shops close. Nacho teaches himself Blender and pivots to 3D animation. First commissions arrive from Netflix and Peak that same year.' },
  { year: '2021', title: 'Homework & the book', description: 'Kickstarter-funded short film "Homework" raises 22K EUR from 718 backers. "The Cute Side of Life" book published by Lunwerg / Editorial Planeta.' },
  { year: '2022', title: 'Blender Conference', description: 'Invited speaker at Blender Conference in Amsterdam. Talk: "From illustration to animation". Naolito Animation Studios formally established in Malaga.' },
  { year: '2024', title: 'Festival circuit', description: '"Homework" premieres worldwide: 100+ festival selections, 20+ awards including Best Animated Short at Festival de Cine de Malaga. Preselected for Spain\'s Goya Awards.' },
  { year: '2026', title: 'Disney+', description: 'Deal signed with Disney for original animated content on Disney+. The biggest milestone yet.' },
]

const stats = [
  { value: '100+', label: 'Festival selections' },
  { value: '20+', label: 'Awards won' },
  { value: '600K+', label: 'Followers worldwide' },
  { value: '2009', label: 'Creating since' },
]

const clients = [
  { name: 'Netflix', logo: 'https://naolito.com/cdn/shop/files/N_Logo_netflix_1_160x.png?v=1614305957' },
  { name: 'Amazon', logo: 'https://naolito.com/cdn/shop/files/amazon_logo_web_160x.png?v=1708935607' },
  { name: 'PlayStation', logo: 'https://naolito.com/cdn/shop/files/N_logo_playstation_1_2df48dd6-ac9c-4e00-9f70-47dc89195bce_160x.png?v=1614305957' },
  { name: 'Nestle', logo: 'https://naolito.com/cdn/shop/files/N_logo_nestle_1_160x.jpg?v=1614305957' },
  { name: 'Pilot', logo: 'https://naolito.com/cdn/shop/files/N_logo_pilot_1_160x.png?v=1614305957' },
  { name: 'Peak', logo: 'https://naolito.com/cdn/shop/files/N_logo_peak_1_160x.jpg?v=1614305957' },
  { name: 'San Miguel', logo: 'https://naolito.com/cdn/shop/files/san_miguel_logo_3_160x.png?v=1662374827' },
  { name: 'BenQ', logo: 'https://naolito.com/cdn/shop/files/benq_logo_160x.png?v=1662374352' },
]

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-24 md:py-32 bg-[#f8fbff] overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.18), transparent 50%), radial-gradient(circle at 80% 80%, rgba(251,113,133,0.12), transparent 45%)',
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center max-w-6xl mx-auto">
              <Reveal>
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
                  About
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-slate-900 leading-tight">
                  From doodles to
                  <span className="block text-transparent bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 bg-clip-text">
                    award-winning animation
                  </span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-xl">
                  Naolito is the creative universe of Nacho Diaz Arjona: illustrator, animator, filmmaker, and the mind behind "The Cute Side of Life". Based in Malaga, Spain.
                </p>
              </Reveal>

              <Reveal delay={120}>
                <div className="relative rounded-3xl overflow-hidden border border-black/10 aspect-square max-w-md mx-auto lg:ml-auto">
                  <img
                    src="https://naolito.com/cdn/shop/files/Nacho2_925x.jpg?v=1727182912"
                    alt="Nacho Diaz Arjona, creator of Naolito"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Origin Story */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal>
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                    The beginning
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 leading-tight">
                    A t-shirt contest<br />changed everything
                  </h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>
                      In 2009, Nacho Arjona won a t-shirt design contest on Pampling. He had always wanted to be an illustrator but never believed it was possible. That first win proved otherwise. He started submitting designs to Threadless, Redbubble, TeePublic, and every platform he could find.
                    </p>
                    <p>
                      What followed was a decade of building: pop-culture parodies, humorous "Before & After" comics, cute avocado families, and nostalgic gaming references. The Naolito style was born. By 2016, the "Villains Need Love" series went massively viral, featured across BoredPanda, DesignTaxi, and hundreds of blogs. The Kickstarter art book funded in just 4 days.
                    </p>
                    <p>
                      Naolito grew to over 600,000 followers and sold designs on 14+ platforms worldwide. The brand went from screens to shelves, with products in physical stores across Spain, Belgium, France, and Italy.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="space-y-4">
                  <div className="rounded-3xl overflow-hidden border border-black/10">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0411/9605/files/02_about_naolito_interior_480x480.jpg?v=1561221377"
                      alt="Naolito illustrations and workspace"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-black/10 bg-[#f8fbff] p-5 text-center"
                      >
                        <div className="text-2xl md:text-3xl font-display font-semibold text-slate-900">{stat.value}</div>
                        <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* The Pivot */}
        <section className="py-20 md:py-28 bg-[#f8fbff]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-center">
              <Reveal>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-3xl overflow-hidden border border-black/10 aspect-[3/4]">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0411/9605/files/spencer_stills_web_600x600.jpg?v=1708937884"
                      alt="Homework short film still - Spencer the pencil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden border border-black/10 aspect-[3/4] mt-8">
                    <img
                      src="https://cdn.shopify.com/s/files/1/0411/9605/files/eraser_jumping_stills_web_600x600.jpg?v=1708937861"
                      alt="Homework short film still - eraser character"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                    The pivot
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 leading-tight">
                    Lockdown closed the shops.<br />It opened a studio.
                  </h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>
                      When COVID hit in 2020, Nacho had to close the physical retail locations. Instead of waiting it out, he picked up Blender and taught himself 3D animation, studying tutorials late into the night. Within months, the first animated tests caught the attention of Netflix and Peak, who commissioned character animations.
                    </p>
                    <p>
                      The illustration brand had become an animation studio. Naolito Animation Studios was formally established in Malaga, with a team handling end-to-end production: concept, character design, modeling, rigging, animation, lighting, and compositing. All built on Blender and open-source tools.
                    </p>
                    <p>
                      The Netflix collaboration became a yearly tradition. Then came Amazon, PlayStation, Nestle (with their Nesquik "Before & After" mug collection), Pilot Frixion, San Miguel, and more. In 2024, "Homework", the Kickstarter-funded debut short film, premiered at over 100 festivals, won 20+ awards, and was preselected for Spain's Goya Awards.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Reveal>
              <div className="text-center mb-14">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
                  Collaborations
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900">
                  Trusted by global brands
                </h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                  From illustration commissions and product licensing to full animation campaigns.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {clients.map((client) => (
                  <div
                    key={client.name}
                    className="rounded-2xl border border-black/10 bg-[#f8fbff] p-6 md:p-8 flex items-center justify-center aspect-[2/1]"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-h-10 md:max-h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28 bg-[#f8fbff]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <Reveal>
              <div className="text-center mb-16">
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
                  Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900">
                  Key milestones
                </h2>
              </div>
            </Reveal>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-sky-300 to-sky-100 md:-translate-x-px" />

              <div className="space-y-10 md:space-y-14">
                {milestones.map((milestone, i) => (
                  <Reveal key={milestone.year} delay={i * 50}>
                    <div className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      {/* Dot */}
                      <div className="absolute left-[16px] md:left-1/2 md:-translate-x-1/2 w-[15px] h-[15px] rounded-full bg-white border-[3px] border-sky-400 z-10 mt-1.5" />

                      {/* Content */}
                      <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-4 md:text-right' : 'md:pl-4'}`}>
                        <span className="text-sm font-semibold text-sky-500">{milestone.year}</span>
                        <h3 className="text-lg font-display font-semibold text-slate-900 mt-1">{milestone.title}</h3>
                        <p className="text-slate-600 mt-1.5 leading-relaxed text-[15px]">{milestone.description}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stores */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal>
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                    Retail
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 leading-tight">
                    From screens to shelves
                  </h2>
                  <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                    <p>
                      Naolito products live in physical stores across Europe. From Barcelona's Gothic Quarter to Rome's Corso Vittorio Emanuele, the illustrations that started as digital files now sit on real shelves in real cities.
                    </p>
                    <p>
                      The merchandise operation spans 14+ online platforms (Threadless, Redbubble, TeePublic, Pampling, Displate, and more) and a direct-to-consumer store at naolito.com. T-shirts, metal posters, art prints, notebooks, and two published books.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="rounded-3xl border border-black/10 bg-[#f8fbff] p-6 md:p-8">
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-6">Stockist locations</div>
                  <div className="space-y-4">
                    {[
                      { country: 'Spain', cities: 'Barcelona, Granada, Vigo, Jerez de la Frontera' },
                      { country: 'Italy', cities: 'Rome' },
                      { country: 'France', cities: 'Carpentras' },
                      { country: 'Belgium', cities: 'Huy' },
                    ].map((loc) => (
                      <div key={loc.country} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-sky-400 mt-2 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 text-sm">{loc.country}</div>
                          <div className="text-slate-500 text-sm">{loc.cities}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-black/10">
                    <div className="text-xs uppercase tracking-[0.35em] text-slate-500 mb-3">Online platforms</div>
                    <div className="flex flex-wrap gap-2">
                      {['Threadless', 'Redbubble', 'TeePublic', 'Pampling', 'Displate', 'NeatoShop', 'OtherTees', 'naolito.com'].map((p) => (
                        <span key={p} className="px-2.5 py-1 rounded-full bg-white border border-black/10 text-xs text-slate-600">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Tools & Approach */}
        <section className="py-20 md:py-28 bg-[#f8fbff]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <Reveal>
                <div className="rounded-3xl overflow-hidden border border-black/10">
                  <img
                    src="https://cdn.shopify.com/s/files/1/0411/9605/files/crew_stills_web_480x480.jpg?v=1708937852"
                    alt="Homework production crew and behind the scenes"
                    className="w-full h-auto"
                  />
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="space-y-6">
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                    How we work
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 leading-tight">
                    Open-source tools,<br />studio-quality output
                  </h2>
                  <div className="space-y-4">
                    {[
                      { title: 'Built on Blender', desc: 'Full 3D pipeline on open-source software. Modeling, rigging, animation, lighting, rendering. No license barriers, total creative freedom.' },
                      { title: 'End-to-end production', desc: 'From script and concept through character design, animation, and final delivery. One team, one vision, no handoff gaps.' },
                      { title: 'Character-driven storytelling', desc: 'Every project starts with character. Personality, emotion, and humor are baked into the design from day one. That\'s the Naolito DNA.' },
                    ].map((item) => (
                      <div key={item.title} className="rounded-2xl border border-black/10 bg-white p-5">
                        <h3 className="font-display font-semibold text-slate-900 text-sm">{item.title}</h3>
                        <p className="mt-1.5 text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <Reveal>
              <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em] mb-4 block">
                Malaga, Spain
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-slate-900 leading-tight">
                Let's make something together
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
                Looking for character animation, brand content, or a creative partner for your next campaign? We'd love to hear from you.
              </p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button variant="primary" size="lg">Get in touch</Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
