'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function ProjectsBackdrop() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 overflow-hidden">
      {/* Rotating conic — spans the full two-card backdrop */}
      <motion.div
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, rgba(0,127,255,0.40), rgba(0,127,255,0) 28%, rgba(122,181,255,0.30) 52%, rgba(0,127,255,0) 76%, rgba(0,127,255,0.40))',
          filter: 'blur(70px)',
        }}
      />
      {/* Left orb — left half of grid on desktop, top of stack on mobile */}
      <motion.div
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-8 right-1/2 top-10 h-44 rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(0,127,255,0.55), transparent 70%)',
          filter: 'blur(45px)',
        }}
      />
      {/* Right orb — right half of grid on desktop, bottom of stack on mobile */}
      <motion.div
        animate={reduce ? undefined : { scale: [1.05, 1, 1.05], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-8 left-1/2 right-8 h-40 rounded-full"
        style={{
          background: 'radial-gradient(closest-side, rgba(122,181,255,0.45), transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}
