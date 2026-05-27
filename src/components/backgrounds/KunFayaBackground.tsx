import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export function KunFayaBackground() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !glowRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.to(glowRef.current, {
        backgroundPosition: '100% 50%',
        duration: 25,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-night-deep">
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(170deg, #0a0a0f 0%, #12121a 30%, #1a1a28 60%, #0f0f18 100%)',
        }}
      />

      {/* Ambient color wash */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(42,31,61,0.6) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 70% 60%, rgba(212,165,116,0.15) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />

      {/* Soft top light */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 100% 40% at 50% -5%, rgba(212,165,116,0.2) 0%, transparent 60%)',
        }}
      />

      {/* Scattered soft particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2 + Math.random() * 3,
              height: 2 + Math.random() * 3,
              background: i % 3 === 0 ? 'rgba(212,165,116,0.3)' : 'rgba(245,230,200,0.2)',
              filter: 'blur(1px)',
              animation: `night-twinkle ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle horizontal light streaks */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px w-full"
            style={{
              top: `${15 + i * 18}%`,
              background: 'linear-gradient(90deg, transparent 10%, rgba(212,165,116,0.3) 50%, transparent 90%)',
              transform: `rotate(${-2 + i * 0.5}deg)`,
            }}
          />
        ))}
      </div>

      {/* Vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.6)',
        }}
      />

      {/* Bottom fade */}
      <div 
        className="absolute bottom-0 inset-x-0 h-1/3"
        style={{
          background: 'linear-gradient(to top, rgba(10,10,15,0.9), transparent)',
        }}
      />
    </div>
  )
}
