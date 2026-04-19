type Project = {
  title: string
  badge?: string
  description: string
  tags: string[]
}

const PROJECTS: Project[] = [
  {
    title: 'Peak Performance',
    badge: 'Hacklahoma · Best Beginners',
    description:
      'iPad AI coach built in 24h — multi-modal vision + voice pipeline kept responsive with Swift Actors and async/await.',
    tags: ['Swift', 'Vision', 'WhisperKit'],
  },
  {
    title: 'ToyoTrends',
    badge: 'HackUTD XI · 2nd Place',
    description:
      'Multi-vehicle carbon emission analysis tool integrating CarsXE and SambaNova AI with live Chart.js visualizations.',
    tags: ['React', 'Chart.js', 'APIs'],
  },
]

export function SecondaryProjects() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PROJECTS.map((p) => (
        <article
          key={p.title}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-md transition-all hover:border-accent/30 hover:bg-accent/[0.04]"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

          {p.badge && (
            <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-accent-light">
              {p.badge}
            </div>
          )}
          <h3 className="text-[15px] font-medium tracking-tight text-white">{p.title}</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5 text-[10px]">
            {p.tags.map((t) => (
              <span
                key={t}
                className="rounded-sm border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-white/55"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
