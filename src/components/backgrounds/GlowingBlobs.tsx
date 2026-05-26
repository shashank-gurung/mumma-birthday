import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'

export function GlowingBlobs() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const blobs = ref.current.querySelectorAll('[data-blob]')
    blobs.forEach((blob, i) => {
      gsap.to(blob, {
        x: `random(-40, 40)`,
        y: `random(-30, 30)`,
        scale: `random(0.9, 1.15)`,
        duration: 4 + i * 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        data-blob
        className="absolute -left-[20%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-rose-300/50 blur-[80px]"
      />
      <div
        data-blob
        className="absolute -right-[15%] top-[35%] h-[45vmin] w-[45vmin] rounded-full bg-pink-200/55 blur-[70px]"
      />
      <div
        data-blob
        className="absolute left-[25%] bottom-[5%] h-[50vmin] w-[50vmin] rounded-full bg-fuchsia-200/40 blur-[90px]"
      />
    </div>
  )
}
