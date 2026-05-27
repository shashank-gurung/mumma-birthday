import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export function DreamyPinkBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)
  const orb3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Slow, cinematic orb movements
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: '+=30',
          y: '+=20',
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: '-=40',
          y: '+=30',
          duration: 25,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          x: '+=25',
          y: '-=35',
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient - warm cream to soft blush */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(165deg, #fffaf5 0%, #fff5f0 25%, #ffede6 50%, #ffe8e0 75%, #ffdfd5 100%)',
        }}
      />

      {/* Large ambient orbs - very soft and diffused */}
      <div
        ref={orb1Ref}
        className="absolute -top-[20%] -left-[15%] h-[70vh] w-[70vh] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(255,210,195,0.6) 0%, rgba(255,210,195,0) 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute -bottom-[10%] -right-[10%] h-[60vh] w-[60vh] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(245,184,170,0.5) 0%, rgba(245,184,170,0) 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute top-[30%] right-[10%] h-[40vh] w-[40vh] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(212,165,116,0.3) 0%, rgba(212,165,116,0) 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Subtle light overlay from top */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.8) 0%, transparent 60%)',
        }}
      />

      {/* Very subtle noise texture for depth */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Soft vignette for cinematic feel */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px rgba(139, 58, 58, 0.05)',
        }}
      />
    </div>
  )
}
