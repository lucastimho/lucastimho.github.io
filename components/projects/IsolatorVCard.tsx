'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useCardMotion } from './useCardMotion'

const VALUE_PROP =
  'Rust runtime executing untrusted WASM in fully isolated, ephemeral sandboxes — five layers of defense, sub-20ms cold starts.'

const PROMPT_LINES: { glyph: '$' | '>'; text: string }[] = [
  { glyph: '$', text: 'cargo run --release' },
  { glyph: '>', text: 'wasmtime online · 50 slots pre-warmed' },
  { glyph: '>', text: 'sustained: 9,685 req/s @ p99 19ms' },
]

const METRICS = [
  { label: 'throughput', value: '9,685', unit: 'r/s', filled: 10 },
  { label: 'p99 latency', value: '19', unit: 'ms', filled: 2 },
  { label: 'cold start', value: '<20', unit: 'ms', filled: 1 },
  { label: 'concurrency', value: '50', unit: 'slot', filled: 5 },
]

const TAGS = ['rust', 'wasmtime', 'tokio', 'axum', 'wasi', 'seccomp-bpf']

const DEFENSE_LAYERS = [
  { label: 'seccomp', detail: '67/18' },
  { label: 'OCAP', detail: '19 caps' },
  { label: 'VFS', detail: '256 fd' },
  { label: 'memory', detail: '50MB' },
  { label: 'regex', detail: '16 pat' },
]

export function IsolatorVCard() {
  const reduce = useReducedMotion()
  const { ref, live, onMouseEnter, onMouseLeave } = useCardMotion(reduce)

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-navy-900/80 font-mono backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,127,255,0.05),0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(0,127,255,0.25),0_0_60px_-10px_rgba(0,127,255,0.4),0_30px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={live ? { y: [0, 3] } : { y: 0 }}
          transition={live ? { duration: 0.6, repeat: Infinity, ease: 'linear' } : { duration: 0.3 }}
          className="h-[200%] w-full opacity-[0.05]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(180deg, transparent 0px, transparent 2px, rgba(122,181,255,0.85) 2px, rgba(122,181,255,0.85) 3px)',
          }}
        />
      </div>

      <header className="relative flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-5 py-3">
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#007FFF] shadow-[0_0_8px_rgba(0,127,255,0.6)]" />
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 text-[11px] tracking-tight text-white/40">
          <span className="text-[#007FFF]/70">~/</span>
          <span>isolator-v</span>
          <span className="text-white/20">—</span>
          <span>zsh</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">v0.1.0</span>
      </header>

      <div className="relative space-y-5 px-6 py-6 text-[13px] leading-relaxed text-white/70">
        <div className="flex items-start justify-between gap-4 font-sans">
          <div className="min-w-0 flex-1">
            <h3 className="text-[20px] font-medium tracking-tight text-white">Isolator-V</h3>
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              solo · 2025 · shipped
            </div>
            <p className="mt-3 text-balance text-[13px] leading-relaxed text-white/60">
              {VALUE_PROP}
            </p>
          </div>
          <a
            href="https://github.com/lucastimho/isolator-v-wasm-sandbox"
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

        <div aria-hidden className="space-y-1.5">
          {PROMPT_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.35, ease: 'easeOut' }}
              className="flex gap-3"
            >
              <span className={line.glyph === '$' ? 'text-[#007FFF]' : 'text-white/25'}>
                {line.glyph}
              </span>
              <span className="text-white/65">{line.text}</span>
            </motion.div>
          ))}
          <div className="flex gap-3">
            <span className="text-[#007FFF]">$</span>
            <motion.span
              animate={live ? { opacity: [1, 1, 0, 0] } : { opacity: 0.4 }}
              transition={
                live
                  ? { duration: 1.1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }
                  : { duration: 0.3 }
              }
              className="inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-[#007FFF]/90"
            />
          </div>
        </div>

        <div className="space-y-2.5 rounded-md border border-white/5 bg-navy-950/60 p-4">
          <div aria-hidden className="text-[10px] uppercase tracking-[0.2em] text-white/30">
            [ benchmarks ]
          </div>
          {METRICS.map((m, i) => (
            <div key={m.label} className="flex items-center gap-3 text-[12px]">
              <span className="w-24 shrink-0 text-white/45">{m.label}</span>
              <div aria-hidden className="flex flex-1 gap-[2px]">
                {Array.from({ length: 10 }).map((_, j) => {
                  const on = j < m.filled
                  return (
                    <motion.span
                      key={j}
                      initial={reduce ? false : { scaleY: 0.2, opacity: 0.2 }}
                      whileInView={{ scaleY: on ? 1 : 0.25, opacity: on ? 1 : 0.18 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.08 + j * 0.025, duration: 0.3 }}
                      className="h-3.5 flex-1 origin-bottom rounded-[1px]"
                      style={{
                        backgroundColor: on ? '#007FFF' : 'rgba(255,255,255,0.5)',
                        boxShadow: on ? '0 0 6px rgba(0,127,255,0.4)' : undefined,
                      }}
                    />
                  )
                })}
              </div>
              <span className="w-20 text-right text-white tabular-nums">
                {m.value}
                <span className="ml-0.5 text-white/40">{m.unit}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 text-[10px]">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border border-white/10 bg-white/[0.03] px-2 py-1 text-white/55 transition-colors hover:border-[#007FFF]/30 hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <footer className="relative flex items-center gap-2.5 border-t border-white/5 bg-white/[0.02] px-5 py-3 text-[11px] text-white/45">
        <div aria-hidden className="relative flex items-end gap-[3px]">
          {DEFENSE_LAYERS.map((layer, i) => (
            <span key={layer.label} className="group/bar relative">
              <motion.span
                animate={live ? { opacity: [0.35, 1, 0.35] } : { opacity: 0.6 }}
                transition={
                  live
                    ? { duration: 2.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }
                    : { duration: 0.3 }
                }
                className="block h-3 w-[3px] rounded-sm bg-[#007FFF] transition-transform duration-150 group-hover/bar:scale-y-125"
              />
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-[34px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-sm border border-white/10 bg-navy-950/95 px-1.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] opacity-0 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-opacity duration-200 group-hover/bar:opacity-100"
              >
                <span className="text-[#7ab5ff]">{layer.label}</span>
                <span className="text-white/35">·</span>
                <span className="text-white/65">{layer.detail}</span>
              </span>
            </span>
          ))}
        </div>
        <span>5-layer defense · 5,130 LOC</span>
      </footer>
    </motion.article>
  )
}
