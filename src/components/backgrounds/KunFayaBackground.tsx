import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export function KunFayaBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    gsap.to(ref.current, {
      rotate: 360,
      duration: 120,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#1a0f1f]">
      <div
        ref={ref}
        className="absolute -inset-[50%] opacity-60"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #2d1b3d, #4a1942, #1e3a5f, #2d1b3d, #6b2d5c, #1a0f1f)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-violet-950/40 via-transparent to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0610_85%)]" />
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute h-px w-full opacity-20"
          style={{
            top: `${8 + i * 7}%`,
            background: `linear-gradient(90deg, transparent, rgba(167,139,250,0.4), transparent)`,
            transform: `rotate(${i * 3}deg)`,
          }}
        />
      ))}
    </div>
  )
}
