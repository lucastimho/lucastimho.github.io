'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface ExperienceEntry {
  year: string
  period: string
  role: string
  org: string
  location: string
  bullets: string[]
  tags?: string[]
}

interface EducationEntry {
  degree: string
  org: string
  location: string
  gpa: string
  years: string
  status?: string
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    year: '2025',
    period: 'Jun — Aug',
    role: 'Machine Learning Research Intern',
    org: 'Applied Research Laboratory',
    location: 'Austin, TX',
    bullets: [
      'Automated object detection in Power Spectral Density data for a U.S. Navy project — a custom deep-learning architecture cut manual analysis time substantially.',
      'Drove reproduction error below 0.01% on clean PSD data via tuned preprocessing and hyperparameter sweeps.',
      'Presented the final model and analysis to senior scientists, informing downstream technical decisions.',
    ],
    tags: ['deep learning', 'signal processing', 'psd'],
  },
  {
    year: '2025',
    period: 'Jan — May',
    role: 'Teaching Assistant — Computer Organization',
    org: 'University of Oklahoma',
    location: 'Norman, OK',
    bullets: [
      'Tutored undergraduates on memory hierarchy and I/O design in 1:1 and group sessions.',
      'Graded assignments, quizzes, and exams with timely, constructive feedback.',
    ],
  },
]

const EDUCATION: EducationEntry[] = [
  {
    degree: 'M.S. Computer Science',
    org: 'University of Oklahoma',
    location: 'Norman, OK',
    gpa: '4.00',
    years: "'24 — '26",
    status: 'in progress',
  },
  {
    degree: 'B.S. Computer Science',
    org: 'University of Oklahoma',
    location: 'Norman, OK',
    gpa: '3.78',
    years: "'23 — '25",
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

export function Experience() {
  const reduce = useReducedMotion()

  return (
    <section id="experience">
      <div className="mb-12 md:grid md:grid-cols-[6rem_1fr] md:gap-10">
        <div className="hidden md:flex md:items-end md:justify-end md:pb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
            &apos;25
          </span>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-accent-light">
            experience
          </div>
          <h2 className="mt-2 text-[28px] font-semibold tracking-tight text-white">
            The path so far
          </h2>
        </div>
      </div>

      <div className="relative">
        <motion.span
          aria-hidden
          initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.4, ease: EASE }}
          style={{ transformOrigin: 'top' }}
          className="pointer-events-none absolute left-2 top-[14px] h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-white/30 via-white/10 to-transparent md:left-[6.5rem] md:top-4"
        />

        <ol aria-label="Career timeline" className="space-y-12 md:space-y-14">
          {EXPERIENCE.map((entry, i) => (
            <TimelineEntry key={`${entry.year}-${entry.role}`} entry={entry} index={i} />
          ))}
        </ol>
      </div>

      <div className="mt-14 md:mt-16 md:grid md:grid-cols-[6rem_1fr] md:gap-10">
        <div className="hidden md:flex md:justify-end md:pt-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
            education
          </span>
        </div>
        <div>
          <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-white/30 md:hidden">
            education
          </div>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
            {EDUCATION.map((entry) => (
              <EducationRow key={entry.degree} entry={entry} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const reduce = useReducedMotion()
  const baseDelay = 0.15 + index * 0.1

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.55, delay: baseDelay, ease: EASE }}
      className="group relative grid grid-cols-1 gap-2 md:grid-cols-[6rem_1fr] md:gap-10"
    >
      <div className="hidden md:block md:text-right">
        <div className="font-mono text-[34px] font-medium leading-none tracking-tight text-white/45 transition-colors duration-300 group-hover:text-white/75">
          {entry.year}
        </div>
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {entry.period}
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute left-2 top-[14px] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgba(0,127,255,0.6)] transition-shadow duration-300 group-hover:shadow-[0_0_18px_rgba(0,127,255,0.95)] md:left-[6.5rem] md:top-4"
      />

      <div className="pl-7 md:pl-0">
        <div className="mb-3 flex items-baseline gap-3 md:hidden">
          <div className="font-mono text-[26px] font-medium leading-none tracking-tight text-white/55">
            {entry.year}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            {entry.period}
          </div>
        </div>

        <h3 className="text-balance text-[19px] font-semibold leading-snug tracking-tight text-white md:text-[21px]">
          {entry.role}
        </h3>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[13px] text-white/60">
          <span>{entry.org}</span>
          <span className="text-white/20">·</span>
          <span>{entry.location}</span>
        </div>

        <ul className="mt-4 space-y-2.5 text-[13.5px] leading-relaxed text-white/65">
          {entry.bullets.map((b, j) => (
            <li key={j} className="flex gap-3">
              <span
                aria-hidden
                className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-accent/60"
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {entry.tags && entry.tags.length > 0 && (
          <div className="mt-4 font-mono text-[11px] text-white/45">
            {entry.tags.join(' · ')}
          </div>
        )}
      </div>
    </motion.li>
  )
}

function EducationRow({ entry }: { entry: EducationEntry }) {
  return (
    <li className="group flex items-baseline justify-between gap-4 border-t border-white/10 pt-3 transition-colors duration-300 hover:border-accent/30">
      <div className="min-w-0">
        <div className="text-[14.5px] font-medium leading-tight tracking-tight text-white">
          {entry.degree}
        </div>
        <div className="mt-1 truncate text-[12px] text-white/55">
          {entry.org} · {entry.location}
        </div>
        {entry.status && (
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-light">
            {entry.status}
          </div>
        )}
      </div>
      <div className="shrink-0 text-right font-mono">
        <div className="text-[15px] text-white/80 tabular-nums transition-colors duration-300 group-hover:text-white">
          {entry.gpa}
        </div>
        <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/35">
          {entry.years}
        </div>
      </div>
    </li>
  )
}
