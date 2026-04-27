'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'

const INTENTS = [
  'summarize q2 launch retrospective',
  'recall last week reflections',
  'find related: "tool-use safety"',
  'pin: shipping decision · oct 12',
]

const STORY_BEATS: { label: string; text: string }[] = [
  {
    label: 'problem',
    text: 'AI agents need persistent memory across sessions and devices. A centralized vector store adds a network round-trip to every retrieval; pure local storage vanishes when the device is wiped.',
  },
  {
    label: 'approach',
    text: "Take the CAP trade-off explicitly: edge SQLite is the synchronous source of truth on the hot path; central pgvector reaches eventual consistency via BullMQ write-behind. Two-tier eviction (inline TTL+LRU plus semantic Recency × Importance / (1 + Density)) keeps the working set bounded.",
  },
  {
    label: 'built',
    text: '3,800 lines of Bun/TypeScript across 24 backend modules. Hono ingestor, OPA capability authorization, pluggable embedding encryption, refresh-ahead prefetch on intent change. Plus a Next.js 15 + Three.js operator HUD rendering thousands of 384-d embeddings at 60fps with raycasted hover-pick.',
  },
  {
    label: 'result',
    text: 'Sub-millisecond synchronous local retrieval. 143 tests across 18 specs, all green. The galaxy HUD picks individual stars under the cursor, cascades through five Esc-deselect levels, and holds 60fps under drag-orbit and search-highlight interaction.',
  },
]

const METRICS = [
  { value: '<1', unit: 'ms', label: 'hot-path retrieval' },
  { value: '143', unit: 'tests', label: 'across 18 specs' },
  { value: '60', unit: 'fps', label: 'WebGL HUD' },
]

const STACK = ['Bun', 'Hono', 'Three.js', 'pgvector', 'BullMQ', 'OPA']

type Point = { x: number; y: number; size: number }

function galaxyPoints(count: number, seed: number): Point[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * seed * 9301 + 49297) % 233280
    const b = (i * seed * 17389 + 12347) % 233280
    return {
      x: (a / 233280) * 100,
      y: (b / 233280) * 100,
      size: i % 13 === 0 ? 2.5 : i % 5 === 0 ? 1.5 : 1,
    }
  })
}

const BG_DOTS = galaxyPoints(72, 11)
const GALAXY_DOTS = galaxyPoints(120, 17)
const HIGHLIGHTED = [
  { x: 28, y: 38, depth: 0.7 },
  { x: 52, y: 60, depth: 1.0 },
  { x: 71, y: 35, depth: 0.5 },
  { x: 44, y: 78, depth: 0.85 },
  { x: 18, y: 64, depth: 0.6 },
]
const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 4],
  [0, 4],
]

function HighlightedStar({
  point,
  index,
  mouseX,
  mouseY,
  reduce,
}: {
  point: { x: number; y: number; depth: number }
  index: number
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  reduce: boolean | null
}) {
  const tx = useTransform(mouseX, (m) => m * point.depth * 14)
  const ty = useTransform(mouseY, (m) => m * point.depth * 14)

  return (
    <motion.span
      aria-hidden
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        x: tx,
        y: ty,
      }}
      animate={
        reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.35, 1] }
      }
      transition={{
        duration: 2.4 + index * 0.3,
        repeat: Infinity,
        delay: index * 0.5,
        ease: 'easeInOut',
      }}
      className="absolute h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#007FFF] shadow-[0_0_10px_rgba(0,127,255,0.85)]"
    />
  )
}

export function SentientCacheCard() {
  const reduce = useReducedMotion()
  const galaxyRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!galaxyRef.current || reduce) return
    const rect = galaxyRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const [intentIdx, setIntentIdx] = useState(0)
  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    if (reduce) {
      setCharCount(INTENTS[intentIdx].length)
      return
    }

    const intent = INTENTS[intentIdx]
    let i = 0
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      if (i <= intent.length) {
        setCharCount(i)
        i += 1
        timeout = setTimeout(tick, 38)
      } else {
        timeout = setTimeout(() => {
          setIntentIdx((prev) => (prev + 1) % INTENTS.length)
        }, 2400)
      }
    }

    tick()
    return () => clearTimeout(timeout)
  }, [intentIdx, reduce])

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b1a]/70 font-sans backdrop-blur-2xl shadow-[0_0_0_1px_rgba(0,127,255,0.05),0_30px_60px_-20px_rgba(0,0,0,0.7)] transition-shadow duration-500 hover:shadow-[0_0_0_1px_rgba(0,127,255,0.25),0_0_60px_-10px_rgba(0,127,255,0.4),0_30px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
        {BG_DOTS.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              opacity: 0.15 + (i % 5) * 0.08,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#007FFF]/50 to-transparent" />

      <div className="relative px-7 py-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-[#7ab5ff]">
              <div className="flex gap-[3px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#007FFF]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#007FFF]/55" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#007FFF]/25" />
              </div>
              edge-native memory
            </div>
            <h3 className="mt-3 text-[26px] font-semibold leading-none tracking-tight text-white">
              Sentient<span className="mx-0.5 text-[#7ab5ff]">·</span>Cache
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
            href="https://github.com/lucastimho/sentient-cache"
            target="_blank"
            rel="noreferrer"
            aria-label="View source on GitHub"
            className="shrink-0 rounded-full border border-white/10 bg-white/5 p-2.5 text-white/70 transition hover:border-[#007FFF]/40 hover:bg-[#007FFF]/10 hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1-.02-1.96-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .31.21.67.8.55C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z" />
            </svg>
          </a>
        </div>

        <div
          ref={galaxyRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mt-7 h-36 overflow-hidden rounded-xl border border-white/10 bg-black/40"
        >
          <div className="absolute inset-0">
            {GALAXY_DOTS.map((d, i) => (
              <span
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: d.size,
                  height: d.size,
                  opacity: 0.18 + (i % 7) * 0.08,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>

          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {EDGES.map(([a, b], i) => {
              const A = HIGHLIGHTED[a]
              const B = HIGHLIGHTED[b]
              return (
                <line
                  key={i}
                  x1={`${A.x}%`}
                  y1={`${A.y}%`}
                  x2={`${B.x}%`}
                  y2={`${B.y}%`}
                  stroke="rgba(0,127,255,0.32)"
                  strokeWidth="0.7"
                />
              )
            })}
          </svg>

          <div className="absolute inset-0">
            {HIGHLIGHTED.map((p, i) => (
              <HighlightedStar
                key={i}
                point={p}
                index={i}
                mouseX={mouseX}
                mouseY={mouseY}
                reduce={reduce}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute left-3 right-3 top-2.5 flex items-center gap-1.5 font-mono text-[10px]">
            <span className="text-white/35 uppercase tracking-[0.18em]">intent</span>
            <span className="text-white/20">→</span>
            <span className="flex min-w-0 items-center text-white/80">
              <span className="truncate">
                &quot;{INTENTS[intentIdx].slice(0, charCount)}&quot;
              </span>
              <motion.span
                aria-hidden
                animate={
                  reduce
                    ? undefined
                    : { opacity: [1, 1, 0, 0] }
                }
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  times: [0, 0.5, 0.5, 1],
                  ease: 'linear',
                }}
                className="ml-[2px] inline-block h-[10px] w-[5px] -translate-y-[1px] bg-[#7ab5ff]"
              />
            </span>
          </div>
          <div className="pointer-events-none absolute bottom-2.5 right-3 font-mono text-[9.5px] tabular-nums text-white/40">
            top-k = 5 · cosine
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

        <div className="mt-5 rounded-xl border border-white/10 bg-black/25 px-4 py-3">
          <div className="mb-2.5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]">
            <span className="text-white/40">partition trade-off</span>
            <span className="font-mono text-[#7ab5ff]">AP-consistent</span>
          </div>
          <div className="relative flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#007FFF] shadow-[0_0_5px_rgba(0,127,255,0.7)]" />
              <span className="font-mono text-[11px] text-white/70">edge</span>
              <span className="font-mono text-[10px] text-white/35">·sqlite</span>
            </div>
            <div className="relative h-px flex-1 overflow-hidden bg-white/10">
              <motion.div
                aria-hidden
                animate={reduce ? undefined : { x: ['-100%', '300%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: [0.65, 0, 0.35, 1],
                  repeatDelay: 0.6,
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#007FFF] to-transparent"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-white/35">pgvector·</span>
              <span className="font-mono text-[11px] text-white/70">central</span>
              <motion.span
                aria-hidden
                animate={
                  reduce ? undefined : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.2, 1] }
                }
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="h-1.5 w-1.5 rounded-full bg-white/45"
              />
            </div>
          </div>
          <div className="mt-2 font-mono text-[9.5px] text-white/30">
            write-behind · BullMQ · eventual
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
    </motion.article>
  )
}
