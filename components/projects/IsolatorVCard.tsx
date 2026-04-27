'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PROMPT_LINES: { glyph: '$' | '>'; text: string }[] = [
  { glyph: '$', text: 'cargo run --release' },
  { glyph: '>', text: 'wasmtime runtime online · 50 slots pre-warmed' },
  { glyph: '>', text: 'seccomp-bpf active · 67 syscalls allowed' },
  { glyph: '>', text: 'sustained: 9,685 req/s @ p99 19ms' },
]

const METRICS = [
  { label: 'throughput', value: '9,685', unit: 'r/s', filled: 10 },
  { label: 'p99 latency', value: '19', unit: 'ms', filled: 2 },
  { label: 'cold start', value: '<20', unit: 'ms', filled: 1 },
  { label: 'concurrency', value: '50', unit: 'slot', filled: 5 },
]

const TAGS = ['rust', 'wasmtime', 'tokio', 'axum', 'wasi', 'seccomp-bpf']

const STORY_BEATS: { label: string; text: string }[] = [
  {
    label: 'problem',
    text: 'AI agents need to run untrusted code at scale. Most sandboxes rely on a single enforcement boundary — one bypass and the host is exposed.',
  },
  {
    label: 'approach',
    text: 'Five independent layers: seccomp BPF at the kernel, OCAP capability policy at the WASI call site, an in-memory VFS for zero host filesystem exposure, a Wasmtime ResourceLimiter that vetoes memory growth, and a regex scrubber on all output. One layer down, four still standing.',
  },
  {
    label: 'built',
    text: '5,130 lines of Rust — a Wasmtime pool of 50 pre-warmed sandboxes backed by Tokio, a Go orchestrator for load distribution, and a Next.js frontend with an in-browser Rust→WASM compiler so users can write and run code without a local toolchain.',
  },
  {
    label: 'result',
    text: '9,685 req/s sustained · P99 < 19ms · cold starts under 20ms. Lock-free back-pressure sheds load before saturation with calibrated Retry-After responses at three CPU thresholds.',
  },
]

export function IsolatorVCard() {
  const reduce = useReducedMotion()

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b1a]/80 font-mono backdrop-blur-xl shadow-[0_0_0_1px_rgba(0,127,255,0.05),0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(0,127,255,0.25),0_0_60px_-10px_rgba(0,127,255,0.4),0_30px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <header className="relative flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-5 py-3">
        <div className="flex gap-1.5">
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

      <div className="relative space-y-6 px-6 py-7 text-[13px] leading-relaxed text-white/70">
        <div className="font-sans">
          <h3 className="text-[20px] font-medium tracking-tight text-white">Isolator-V</h3>
          <div className="mt-4 space-y-4">
            {STORY_BEATS.map((beat, i) => (
              <motion.div
                key={beat.label}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-light/70">
                  {beat.label}
                </div>
                <p className="text-[12.5px] leading-relaxed text-white/55">{beat.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
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
              animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
              className="inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-[#007FFF]/90"
            />
          </div>
        </div>

        <div className="space-y-2.5 rounded-md border border-white/5 bg-black/30 p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">[ benchmarks ]</div>
          {METRICS.map((m, i) => (
            <div key={m.label} className="flex items-center gap-3 text-[12px]">
              <span className="w-24 shrink-0 text-white/45">{m.label}</span>
              <div className="flex flex-1 gap-[2px]">
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

      <footer className="relative flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-5 py-3 text-[11px]">
        <div className="flex items-center gap-2.5 text-white/45">
          <div aria-hidden className="flex items-end gap-[2.5px]">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: 'easeInOut',
                }}
                className="block h-3 w-[3px] rounded-sm bg-[#007FFF]"
              />
            ))}
          </div>
          <span>5-layer defense · 5,130 LOC</span>
        </div>
        <a
          href="https://github.com/lucastimho/isolator-v-wasm-sandbox"
          target="_blank"
          rel="noreferrer"
          className="group/link flex items-center gap-1.5 text-[#007FFF] transition-colors hover:text-white"
        >
          view source
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
          >
            <path
              d="M2 8 L8 2 M8 2 H4 M8 2 V6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </footer>
    </motion.article>
  )
}
