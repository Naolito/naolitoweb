const clients = [
  { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
  { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'PlayStation', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/00/PlayStation_logo.svg' },
  { name: 'Disney', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Disney%2B_logo.svg' },
  { name: 'Nestlé', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Nestl%C3%A9_logo.svg' },
]

const ClientLogos = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-8">
          <p className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap font-medium">
            Trusted by
          </p>
          
          {/* Marquee Container */}
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-16 animate-marquee">
              {[...clients, ...clients].map((client, i) => (
                <img
                  key={`${client.name}-${i}`}
                  src={client.logo}
                  alt={client.name}
                  className="h-8 md:h-10 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 dark:invert dark:opacity-40 dark:hover:opacity-80 flex-shrink-0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
