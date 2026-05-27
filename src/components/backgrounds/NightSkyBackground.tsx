import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { ShootingStars } from '../effects/ShootingStars'

function Stars() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 75}%`,
    size: Math.random() > 0.9 ? 2.5 + Math.random() : 1 + Math.random() * 1.2,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 3,
    brightness: 0.3 + Math.random() * 0.7,
  }))

  return (
    <>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            backgroundColor: s.size > 2 ? '#fff' : `rgba(255,255,255,${s.brightness})`,
            animationDelay: `${s.delay}s`,
            boxShadow: s.size > 2
              ? '0 0 6px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.4)'
              : s.brightness > 0.6 
                ? '0 0 3px rgba(255,255,255,0.3)'
                : 'none',
            animation: `night-twinkle ${s.duration}s ease-in-out infinite`,
          }}
        />
      ))}
    </>
  )
}

export function NightSkyBackground() {
  const skyRef = useRef<HTMLDivElement>(null)
  const nebulaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      if (skyRef.current) {
        gsap.to(skyRef.current, {
          backgroundPosition: '0% 100%',
          duration: 60,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (nebulaRef.current) {
        gsap.to(nebulaRef.current, {
          x: '+=30',
          y: '+=20',
          duration: 40,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-night-deep">
      {/* Deep space gradient */}
      <div
        ref={skyRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #050508 0%, #0a0a12 20%, #0f0f1a 45%, #0d0d16 70%, #060608 100%)',
          backgroundSize: '100% 200%',
        }}
      />

      {/* Subtle nebula color wash */}
      <div
        ref={nebulaRef}
        className="absolute inset-0 opacity-25"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(42,31,61,0.4) 0%, transparent 50%),
            radial-gradient(ellipse 50% 35% at 75% 65%, rgba(30,40,70,0.3) 0%, transparent 45%)
          `,
        }}
      />

      {/* Horizon glow */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[40%] opacity-60"
        style={{
          background: 'linear-gradient(to top, rgba(20,15,30,0.8) 0%, rgba(15,12,25,0.4) 40%, transparent 100%)',
        }}
      />

      {/* Stars layer */}
      <Stars />

      {/* Shooting stars */}
      <ShootingStars />

      {/* Very subtle light at top center */}
      <div 
        className="absolute top-0 inset-x-0 h-[30%] opacity-20"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(100,110,150,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Cinematic vignette */}
      <div 
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 250px rgba(0,0,0,0.7)',
        }}
      />

      {/* Ground/horizon fade */}
      <div 
        className="absolute bottom-0 inset-x-0 h-[25%]"
        style={{
          background: 'linear-gradient(to top, #040406 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
