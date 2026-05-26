import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { GlowingBlobs } from './GlowingBlobs'
import { FloatingParticles } from './FloatingParticles'

export function DreamyPinkBackground() {
  const meshRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !meshRef.current) return
    gsap.to(meshRef.current, {
      backgroundPosition: '200% 50%',
      duration: 18,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={meshRef}
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #fff5f9 0%, #ffd6e8 25%, #ffb8d4 50%, #ffc9e0 75%, #fff0f5 100%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.5),transparent_55%)]" />
      <GlowingBlobs />
      <FloatingParticles />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  )
}
