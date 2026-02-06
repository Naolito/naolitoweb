import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ContactForm from '../components/ui/ContactForm'
import Reveal from '../components/ui/Reveal'
import { useStore } from '../store/store'

const Contact = () => {
  const contactInfo = useStore((state) => state.contactInfo)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="relative py-20 bg-[#f8fbff] overflow-hidden">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle at 12% 20%, rgba(56,189,248,0.2), transparent 45%), radial-gradient(circle at 85% 16%, rgba(251,113,133,0.18), transparent 40%), radial-gradient(circle at 45% 90%, rgba(253,224,71,0.18), transparent 45%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(120deg, rgba(15,23,42,0.08) 1px, transparent 1px)',
              backgroundSize: '120px 120px',
            }}
          />
          <div className="absolute -top-40 right-[-10%] w-[460px] h-[460px] bg-sky-300/30 rounded-full blur-[180px]" />
          <div className="absolute -bottom-40 left-[-8%] w-[520px] h-[520px] bg-rose-300/30 rounded-full blur-[200px]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
              <Reveal>
                <div>
                  <span className="text-xs font-semibold text-sky-500 uppercase tracking-[0.35em]">
                    Contact
                  </span>
                  <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-slate-900 leading-tight">
                    Let's talk about
                    <span className="block text-transparent bg-gradient-to-r from-primary-600 via-accent-500 to-primary-500 bg-clip-text">
                      your next animation
                    </span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-600 max-w-xl">
                    Ready to bring your animation project to life? Tell us about your goals, timelines, and any
                    references you love. We'll follow up with a tailored approach and a clear plan.
                  </p>

                  <div className="mt-10 rounded-3xl border border-black/10 bg-white/85 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
                    <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Contact info</div>
                    <div className="mt-6 space-y-4">
                      <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white/90 p-4">
                        <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Email</div>
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="text-slate-900 font-medium hover:text-sky-600 transition-colors"
                          >
                            {contactInfo.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white/90 p-4">
                        <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Phone</div>
                          <a
                            href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                            className="text-slate-900 font-medium hover:text-rose-600 transition-colors"
                          >
                            {contactInfo.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 rounded-2xl border border-black/10 bg-white/90 p-4">
                        <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Studio</div>
                          <p className="text-slate-600">{contactInfo.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">Follow</div>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {contactInfo.socialLinks.linkedin && (
                          <a
                            href={contactInfo.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-200 hover:-translate-y-0.5 transition-all"
                            aria-label="LinkedIn"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {contactInfo.socialLinks.twitter && (
                          <a
                            href={contactInfo.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-sky-500 hover:border-sky-200 hover:-translate-y-0.5 transition-all"
                            aria-label="Twitter"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                          </a>
                        )}
                        {contactInfo.socialLinks.instagram && (
                          <a
                            href={contactInfo.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-rose-500 hover:border-rose-200 hover:-translate-y-0.5 transition-all"
                            aria-label="Instagram"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </a>
                        )}
                        {contactInfo.socialLinks.tiktok && (
                          <a
                            href={contactInfo.socialLinks.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-200 hover:-translate-y-0.5 transition-all"
                            aria-label="TikTok"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                            </svg>
                          </a>
                        )}
                        {contactInfo.socialLinks.facebook && (
                          <a
                            href={contactInfo.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:-translate-y-0.5 transition-all"
                            aria-label="Facebook"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                            </svg>
                          </a>
                        )}
                        {contactInfo.socialLinks.youtube && (
                          <a
                            href={contactInfo.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-red-500 hover:border-red-200 hover:-translate-y-0.5 transition-all"
                            aria-label="YouTube"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          </a>
                        )}
                        {contactInfo.socialLinks.vimeo && (
                          <a
                            href={contactInfo.socialLinks.vimeo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 rounded-2xl border border-black/10 bg-white/90 flex items-center justify-center text-slate-600 hover:text-indigo-500 hover:border-indigo-200 hover:-translate-y-0.5 transition-all"
                            aria-label="Vimeo"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="rounded-3xl border border-black/10 bg-white/90 p-8 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Let's build</div>
                  <h2 className="mt-3 text-2xl md:text-3xl font-display font-semibold text-slate-900">
                    Send us a message
                  </h2>
                  <p className="mt-3 text-sm text-slate-500">
                    Share your brief and we will respond within two business days.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Contact
