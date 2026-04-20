import { Starfield } from '@/components/Starfield'
import { Experience } from '@/components/Experience'
import { IsolatorVCard } from '@/components/projects/IsolatorVCard'
import { ApexPayCard } from '@/components/projects/ApexPayCard'
import { ProjectsBackdrop } from '@/components/ProjectsBackdrop'
import { SecondaryProjects } from '@/components/projects/SecondaryProjects'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-navy-950">
      <Starfield />

      <div className="relative mx-auto max-w-6xl px-6 pb-32 pt-24 sm:px-8">
        <header className="max-w-3xl">
          <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-accent-light">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Available for full-time, May 2026
          </div>

          <h1 className="mt-6 text-balance text-[56px] font-semibold leading-[1.02] tracking-tight text-white sm:text-[72px]">
            Lucas Ho
            <span className="block text-white/40">building systems that hold the line.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65">
            Systems-oriented software engineer focused on high-performance runtime design,
            defense-in-depth security architecture, and low-latency concurrent systems in Rust.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-white/55">
            <a
              href="mailto:lucas.t.ho.lh@gmail.com"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              lucas.t.ho.lh@gmail.com
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a
              href="https://github.com/lucastimho"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              github
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a
              href="https://www.linkedin.com/in/lucas-t-ho/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              linkedin
            </a>
            <span className="h-3 w-px bg-white/15" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="group/resume inline-flex items-center gap-1.5 text-accent-light transition-colors hover:text-white"
            >
              résumé
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden
                className="transition-transform group-hover/resume:translate-y-0.5"
              >
                <path
                  d="M5 1 V8 M5 8 L2 5 M5 8 L8 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </header>

        <section className="mt-24" id="work">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-accent-light">
                selected work
              </div>
              <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-white">
                Two systems worth a closer look
              </h2>
            </div>
            <div className="hidden text-right text-[12px] text-white/40 sm:block">
              2024 — 2026
            </div>
          </div>

          <div className="relative isolate">
            <ProjectsBackdrop />
            <div className="grid gap-8 lg:grid-cols-2">
              <IsolatorVCard />
              <ApexPayCard />
            </div>
          </div>
        </section>

        <div className="mt-24">
          <Experience />
        </div>

        <section className="mt-24" id="more">
          <div className="mb-6">
            <div className="text-[11px] uppercase tracking-[0.25em] text-accent-light">
              also shipped
            </div>
            <h2 className="mt-2 text-[20px] font-medium tracking-tight text-white/85">
              Hackathon wins & research projects
            </h2>
          </div>
          <SecondaryProjects />
        </section>

        <footer className="mt-32 flex items-center justify-between border-t border-white/5 pt-6 text-[11px] text-white/35">
          <span>© {new Date().getFullYear()} Lucas Ho</span>
          <span className="font-mono">olathe, ks 39° N, 95° W</span>
        </footer>
      </div>
    </main>
  )
}
