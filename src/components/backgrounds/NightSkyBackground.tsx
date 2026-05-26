import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { ShootingStars } from '../effects/ShootingStars'

function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 70}%`,
    size: Math.random() > 0.85 ? 2.5 : 1 + Math.random(),
    delay: Math.random() * 4,
  }))

  return (
    <>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            opacity: 0.25 + Math.random() * 0.55,
            boxShadow:
              s.size > 2
                ? '0 0 4px rgba(255,255,255,0.5)'
                : '0 0 1px rgba(255,255,255,0.3)',
            animation: 'night-twinkle 4s ease-in-out infinite',
          }}
        />
      ))}
    </>
  )
}

export function NightSkyBackground() {
  const skyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !skyRef.current) return
    gsap.to(skyRef.current, {
      backgroundPosition: '0% 100%',
      duration: 40,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#050508]">
      <div
        ref={skyRef}
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #08080f 0%, #0e0e18 28%, #141422 52%, #12101c 78%, #07070c 100%)',
          backgroundSize: '100% 200%',
        }}
      />
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(ellipse_at_25%_15%,rgba(120,130,200,0.12),transparent_45%)]" />
      <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_70%_80%,rgba(40,35,70,0.2),transparent_55%)]" />
      <Stars />
      <ShootingStars />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
      <div className="absolute bottom-0 inset-x-0 h-2/5 bg-gradient-to-t from-[#06050a] via-[#08080f]/80 to-transparent" />
    </div>
  )
}
