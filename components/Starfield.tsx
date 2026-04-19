type Star = { left: string; top: string; size: number; opacity: number }

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    const a = (i * 9301 + 49297) % 233280
    const b = (i * 17389 + 12347) % 233280
    const c = (i * 73 + 11) % 7
    return {
      left: `${(a / 233280) * 100}%`,
      top: `${(b / 233280) * 100}%`,
      size: i % 17 === 0 ? 2 : 1,
      opacity: 0.18 + (c / 7) * 0.55,
    }
  })
}

const STARS = generateStars(140)

export function Starfield() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 700px at 80% -10%, rgba(0,127,255,0.18), transparent 60%), radial-gradient(900px 500px at 10% 110%, rgba(122,181,255,0.10), transparent 60%)',
        }}
      />

      <div className="absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              boxShadow: s.size > 1 ? '0 0 4px rgba(255,255,255,0.6)' : undefined,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(0,127,255,0.4), transparent)',
        }}
      />
    </div>
  )
}
