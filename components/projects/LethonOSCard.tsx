'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCardMotion } from './useCardMotion'

const VALUE_PROP =
  'Self-governing memory for LLM agents. Three tiers prune by utility score; the safety constitution lives in a separate, immutable tier.'

const ROW_HEIGHT = 44
// Demote-token is h-1.5 (6px) → centered when top = row-center - 3
const DOT_TOP_BY_TIER = [
  ROW_HEIGHT * 1 + ROW_HEIGHT / 2 - 3,
  ROW_HEIGHT * 2 + ROW_HEIGHT / 2 - 3,
  ROW_HEIGHT * 3 + ROW_HEIGHT / 2 - 3,
] as const

const UTILITY_RINGS: Record<string, number[]> = {
  L1: [0.87, 0.86, 0.88, 0.89, 0.87, 0.85, 0.86, 0.88],
  L2: [0.42, 0.43, 0.41, 0.42, 0.4, 0.43, 0.41, 0.42],
  L3: [0.18, 0.17, 0.19, 0.18, 0.2, 0.18, 0.17, 0.19],
}

interface Tier {
  name: string
  store: string
  target: string
  role: string
  utility?: number
  immutable?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'core',
    store: 'Redis',
    target: '<10ms',
    role: 'safety constitution',
    immutable: true,
  },
  { name: 'L1', store: 'Redis', target: '<10ms', role: 'working memory', utility: 0.87 },
  { name: 'L2', store: 'Qdrant', target: '~30ms', role: 'episodic · vector', utility: 0.42 },
  { name: 'L3', store: 'SQLite', target: '~150ms', role: 'cold archive', utility: 0.18 },
]

const METRICS = [
  { value: '4', unit: 'tiers', label: 'memory hierarchy' },
  { value: '120', unit: 'tests', label: 'fully offline' },
  { value: '<10', unit: 'ms', label: 'hot retrieval' },
]

const STACK = ['Python', 'FastAPI', 'Redis', 'Qdrant', 'SQLite', 'D3', 'Ed25519']

const AUDIT_HASHES = ['a3f7', '9e2c', '41b8', '6f0a', 'c4d3']

export function LethonOSCard() {
  const reduce = useReducedMotion()
  const { ref, live, onMouseEnter, onMouseLeave } = useCardMotion(reduce)
  const [tickIdx, setTickIdx] = useState(0)

  useEffect(() => {
    if (!live) return
    const id = window.setInterval(() => {
      setTickIdx((prev) => (prev + 1) % 1000)
    }, 1800)
    return () => window.clearInterval(id)
  }, [live])

  const utilityFor = (name: string): number | undefined => {
    const ring = UTILITY_RINGS[name]
    return ring ? ring[tickIdx % ring.length] : undefined
  }

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/70 font-sans backdrop-blur-2xl shadow-[0_0_0_1px_rgba(0,127,255,0.05),0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(0,127,255,0.25),0_0_60px_-10px_rgba(0,127,255,0.4),0_30px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          background:
            'repeating-linear-gradient(180deg, transparent 0, transparent 56px, rgba(255,255,255,0.5) 56px, rgba(255,255,255,0.5) 57px)',
        }}
      />

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#007FFF]/50 to-transparent" />

      <div className="relative px-7 py-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#7ab5ff]">
              <span aria-hidden className="flex flex-col gap-[2.5px]">
                <span className="h-[2px] w-2.5 rounded-sm bg-[#007FFF]" />
                <span className="h-[2px] w-2.5 rounded-sm bg-[#007FFF]/55" />
                <span className="h-[2px] w-2.5 rounded-sm bg-[#007FFF]/25" />
              </span>
              self-governing memory
            </div>
            <h3 className="mt-3 text-[26px] font-semibold leading-none tracking-tight text-white">
              Lethon-OS
            </h3>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              solo · 2025 · active
            </div>
            <p className="mt-3 text-balance text-[13px] leading-relaxed text-white/60">
              {VALUE_PROP}
            </p>
          </div>

          <a
            href="https://github.com/lucastimho/lethon-os"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70 transition hover:border-[#007FFF]/40 hover:bg-[#007FFF]/10 hover:text-white"
          >
            <svg aria-hidden width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-navy-950/40">
          {TIERS.map((tier, i) => (
            <div
              key={tier.name}
              style={{ height: `${ROW_HEIGHT}px` }}
              className={`relative grid grid-cols-[88px_1fr_auto] items-center gap-3 px-4 ${
                i > 0 ? 'border-t border-white/[0.06]' : ''
              } ${tier.immutable ? 'bg-[#007FFF]/[0.04]' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-full ${
                    tier.immutable
                      ? 'bg-[#007FFF] shadow-[0_0_6px_rgba(0,127,255,0.7)]'
                      : 'bg-white/30'
                  }`}
                />
                <span className="font-mono text-[13px] font-medium tracking-tight text-white">
                  {tier.name}
                </span>
              </div>
              <div className="text-[12px] leading-tight text-white/60">
                <span className="font-mono text-white/75">{tier.store}</span>
                <span aria-hidden className="mx-1.5 text-white/20">·</span>
                <span>{tier.role}</span>
              </div>
              {tier.immutable ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7ab5ff]">
                  immutable
                </span>
              ) : (
                <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums">
                  <span className="text-white/75">
                    U={(utilityFor(tier.name) ?? tier.utility ?? 0).toFixed(2)}
                  </span>
                  <span className="w-12 text-right text-white/35">{tier.target}</span>
                </div>
              )}
            </div>
          ))}

          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: DOT_TOP_BY_TIER[0] }}
            animate={
              live
                ? {
                    y: [
                      DOT_TOP_BY_TIER[0],
                      DOT_TOP_BY_TIER[0],
                      DOT_TOP_BY_TIER[0],
                      DOT_TOP_BY_TIER[1],
                      DOT_TOP_BY_TIER[1],
                      DOT_TOP_BY_TIER[2],
                      DOT_TOP_BY_TIER[2],
                      DOT_TOP_BY_TIER[2],
                    ],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                  }
                : { y: DOT_TOP_BY_TIER[0], opacity: 0 }
            }
            transition={
              live
                ? {
                    duration: 5.6,
                    times: [0, 0.06, 0.26, 0.34, 0.54, 0.62, 0.84, 1],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.3 }
            }
            className="pointer-events-none absolute left-1.5 top-0 h-1.5 w-1.5 rounded-full bg-[#007FFF] shadow-[0_0_5px_rgba(0,127,255,0.7)]"
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2.5">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              whileHover={{ y: -2 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition-all hover:border-[#007FFF]/30 hover:bg-[#007FFF]/[0.05]"
            >
              <div className="text-[22px] font-semibold leading-none tracking-tight text-white tabular-nums">
                {m.value}
                <span className="ml-0.5 text-[12px] font-normal text-[#7ab5ff]">{m.unit}</span>
              </div>
              <div className="mt-1.5 text-[10.5px] leading-tight text-white/50">{m.label}</div>
            </motion.div>
          ))}
        </div>

        <div aria-hidden className="mt-5 rounded-xl border border-white/10 bg-navy-950/40 px-4 py-3">
          <div className="mb-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
            <span className="text-white/40">audit chain</span>
            <span className="font-mono text-[#7ab5ff]">verified</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] tabular-nums">
            {AUDIT_HASHES.map((hash, i) => (
              <div key={hash} className="flex items-center gap-2">
                <motion.span
                  animate={
                    live
                      ? {
                          color: [
                            'rgba(255,255,255,0.55)',
                            'rgba(122,181,255,0.95)',
                            'rgba(255,255,255,0.55)',
                          ],
                        }
                      : { color: 'rgba(255,255,255,0.55)' }
                  }
                  transition={
                    live
                      ? {
                          duration: 2.4,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeInOut',
                        }
                      : { duration: 0.3 }
                  }
                  className="text-white/55"
                >
                  {hash}
                </motion.span>
                {i < AUDIT_HASHES.length - 1 && (
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    className="text-white/20"
                  >
                    <path
                      d="M1.5 4.5 H7.5 M5.5 2.5 L7.5 4.5 L5.5 6.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 font-mono text-[9.5px] text-white/30">
            blake2b root · 7e2f4a8c·5d91·c4a9
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] text-white/55">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">stack</span>
          {STACK.map((t, i) => (
            <span key={t} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden className="h-[3px] w-[3px] rounded-full bg-white/15" />}
              <span className="transition-colors hover:text-white">{t}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
