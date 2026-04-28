import { useEffect, useRef, useState } from 'react'

/**
 * Shared motion gate for the four selected-work cards.
 *
 * Desktop: motion runs while the card is hovered.
 * Touch (no hover): motion fires once 1.5s after the card enters the
 * viewport, plays for ~6s, then returns to rest. One-shot, not perpetual.
 * Reduced-motion: motion is always off; mouse handlers are no-ops.
 */
export function useCardMotion(reduce: boolean | null) {
  const [hovered, setHovered] = useState(false)
  const [touchActive, setTouchActive] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduce) return
    if (typeof window === 'undefined') return

    const isTouch = window.matchMedia('(hover: none)').matches
    const node = ref.current
    if (!isTouch || !node) return

    let onTimer: ReturnType<typeof setTimeout> | undefined
    let offTimer: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onTimer = setTimeout(() => {
            setTouchActive(true)
            offTimer = setTimeout(() => setTouchActive(false), 6000)
          }, 1500)
        } else {
          if (onTimer) clearTimeout(onTimer)
          if (offTimer) clearTimeout(offTimer)
          setTouchActive(false)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (onTimer) clearTimeout(onTimer)
      if (offTimer) clearTimeout(offTimer)
    }
  }, [reduce])

  const live = (hovered || touchActive) && !reduce

  return {
    ref,
    live,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
  }
}
