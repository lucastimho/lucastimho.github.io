'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const STAGES = ['canonicalize', 'classify', 'evaluate', 'issue', 'sign']

const METRICS = [
  { value: '<200', unit: 'ms', label: 'hot-path decision' },
  { value: '<100', unit: 'ms', label: 'audit → dashboard' },
  { value: '138', unit: 'tests', label: 'verified passing' },
]

const STACK = ['FastAPI', 'PostgreSQL', 'OPA', 'Redis', 'Ed25519', 'React 19', 'SSE']

const RECEIPTS: { hash: string; latency: number }[] = [
  { hash: 'e7f3·8a91', latency: 12 },
  { hash: '9c2a·5e1f', latency: 18 },
  { hash: '3b8f·4d7c', latency: 9 },
  { hash: '41a6·7b22', latency: 14 },
]

const STORY_BEATS: { label: string; text: string }[] = [
  {
    label: 'problem',
    text: 'LLM agents are being handed real authority — payment APIs, database writes, external service calls. The canonical failure: a prompt-injected agent invokes a legitimate tool with adversarial parameters. The ClawSafety paper puts skill-injection attack success at 69.4%.',
  },
  {
    label: 'approach',
    text: 'A zero-trust gateway between the agent and its tools. Every intent traverses a five-stage fail-closed pipeline — canonicalize, risk score, OPA policy, scoped credential, Ed25519 receipt — before any action is taken. An embedded Python mirror of the Rego policy means the OPA sidecar going down can never accidentally open the deny path.',
  },
  {
    label: 'built',
    text: 'FastAPI gateway · three least-privilege Postgres roles (write path can\'t read, read path can\'t write) · append-only audit log with pg_notify streaming every decision live to a React dashboard via SSE · HITL escalation queue for high-entropy risk scores · 138 tests, all green.',
  },
  {
    label: 'result',
    text: '< 200ms hot-path decision · < 100ms audit-to-dashboard tail latency · every approved action produces an Ed25519 receipt verifiable offline — no database round-trip required.',
  },
]

export function ApexPayCard() {
  const reduce = useReducedMotion()
  const [receiptIdx, setReceiptIdx] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(
      () => setReceiptIdx((i) => (i + 1) % RECEIPTS.length),
      2800,
    )
    return () => window.clearInterval(id)
  }, [reduce])

  const receipt = RECEIPTS[receiptIdx]

  const [tokenStage, setTokenStage] = useState(-1)

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setTokenStage((prev) => (prev >= STAGES.length - 1 ? -1 : prev + 1))
    }, 700)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative font-sans"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b1a]/60 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(0,127,255,0.05),0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(0,127,255,0.25),0_0_60px_-10px_rgba(0,127,255,0.4),0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#007FFF]/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent" />

        <div className="relative px-7 py-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#7ab5ff]">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#007FFF] opacity-75" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#007FFF]" />
                </span>
                zero-trust gateway
              </div>
              <h3 className="mt-3 text-[28px] font-semibold leading-none tracking-tight text-white">
                APEX<span className="mx-0.5 text-[#7ab5ff]">·</span>Pay
              </h3>
              <div className="mt-4 space-y-4">
                {STORY_BEATS.map((beat, i) => (
                  <motion.div
                    key={beat.label}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7ab5ff]/70">
                      {beat.label}
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-white/55">{beat.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <a
              href="https://github.com/lucastimho/apex-pay"
              target="_blank"
              rel="noreferrer"
              aria-label="View source on GitHub"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70 transition hover:border-[#007FFF]/40 hover:bg-[#007FFF]/10 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
          </div>

          <div className="mt-7 rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                5-stage pipeline
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#7ab5ff]">
                fail-closed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {STAGES.map((stage, i) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                  className="group/stage relative flex-1"
                >
                  <div
                    className={`rounded-md border px-2 py-2.5 text-center text-[10.5px] font-medium tracking-tight transition-all duration-300 ${
                      tokenStage === i
                        ? 'border-[#007FFF]/50 bg-[#007FFF]/[0.10] text-white'
                        : 'border-white/10 bg-white/[0.04] text-white/75 group-hover/stage:border-[#007FFF]/40 group-hover/stage:bg-[#007FFF]/[0.08] group-hover/stage:text-white'
                    }`}
                  >
                    {stage}
                  </div>
                  <AnimatePresence>
                    {tokenStage === i && (
                      <motion.span
                        layoutId="apex-decision-token"
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#007FFF] shadow-[0_0_6px_rgba(0,127,255,0.95)]"
                      />
                    )}
                  </AnimatePresence>
                  {i < STAGES.length - 1 && (
                    <motion.div
                      aria-hidden
                      animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
                      className="absolute -right-[7px] top-1/2 h-px w-2 -translate-y-1/2 bg-[#007FFF] shadow-[0_0_6px_rgba(0,127,255,0.6)]"
                    />
                  )}
                </motion.div>
              ))}
            </div>
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

          <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-black/25 px-3.5 py-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                ed25519 ledger · live
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[#7ab5ff]">
                <span className="relative flex h-1.5 w-1.5">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#007FFF] opacity-75" />
                  )}
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#007FFF]" />
                </span>
                signed
              </span>
            </div>
            <div className="relative h-[18px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={receiptIdx}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center gap-3 font-mono text-[11px]"
                >
                  <span className="text-white/40">sig</span>
                  <span className="tabular-nums text-white/85">{receipt.hash}</span>
                  <span className="text-white/25">→</span>
                  <span className="text-[#7ab5ff]">approved</span>
                  <span className="ml-auto tabular-nums text-white/45">
                    {receipt.latency}ms
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] text-white/55">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">stack</span>
            {STACK.map((t, i) => (
              <span key={t} className="flex items-center gap-2.5">
                {i > 0 && <span className="h-[3px] w-[3px] rounded-full bg-white/15" />}
                <span className="transition-colors hover:text-white">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
