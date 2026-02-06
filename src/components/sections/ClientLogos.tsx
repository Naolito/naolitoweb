import { useEffect, useState, type CSSProperties } from 'react'
import { fetchContent } from '../../lib/contentApi'
import { ClientLogo as AdminClientLogo, normalizeClientLogo } from '../../lib/contentSections'
import Reveal from '../ui/Reveal'

const makeWordmark = (label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="80" viewBox="0 0 320 80">
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Syne, Sora, Arial, sans-serif" font-size="36" letter-spacing="2" fill="#0f172a">${label}</text>
    </svg>`
  )}`

type ClientLogo = {
  name: string
  logo: string
  fallback?: string
}

const fallbackClients: ClientLogo[] = [
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    fallback: makeWordmark('Netflix'),
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    fallback: makeWordmark('Amazon'),
  },
  {
    name: 'PlayStation',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg',
    fallback: makeWordmark('PlayStation'),
  },
  { name: 'Disney', logo: makeWordmark('Disney'), fallback: makeWordmark('Disney') },
  { name: 'Nestlé', logo: makeWordmark('Nestlé'), fallback: makeWordmark('Nestlé') },
]

const ClientLogos = () => {
  const [logos, setLogos] = useState<ClientLogo[]>(fallbackClients)

  useEffect(() => {
    let isCancelled = false

    fetchContent<AdminClientLogo[]>('client-logos').then((logoData) => {
      if (isCancelled) return

      const mappedLogos = (logoData || [])
        .map((item) => normalizeClientLogo(item))
        .filter((item) => item.logoUrl)
        .map((item) => ({
          name: item.name,
          logo: item.logoUrl,
          fallback: makeWordmark(item.name),
        }))

      if (mappedLogos.length > 0) {
        setLogos(mappedLogos)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <section className="relative py-12 bg-[#f8fbff]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-black/10 bg-white/90 p-6 sm:p-8 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
              Global brands who trust us
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {logos.map((client, index) => (
                <div
                  key={client.name}
                  className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white px-6 py-6 flex items-center justify-center hover:border-black/20 hover:bg-slate-50 transition-all client-card-animate"
                  style={{ '--delay': `${index * 120 + 140}ms` } as CSSProperties}
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-7 md:h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0 client-logo-animate"
                    loading="lazy"
                    onError={(event) => {
                      const target = event.currentTarget
                      if (target.dataset.fallback === '1') return
                      if (client.fallback) {
                        target.dataset.fallback = '1'
                        target.src = client.fallback
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default ClientLogos
