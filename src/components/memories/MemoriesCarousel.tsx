import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { CAROUSEL_MEMORIES } from '../../data/memories'
import { COPY } from '../../lib/constants'

const DUPLICATED = [...CAROUSEL_MEMORIES, ...CAROUSEL_MEMORIES]

export function MemoriesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !trackRef.current) return
    const track = trackRef.current
    const width = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: -width,
      duration: width / 45,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: (x) => {
          const n = parseFloat(x)
          return `${n % -width}px`
        },
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div data-page-content className="w-full overflow-hidden">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-rose-600/80">
        {COPY.memories.carouselLabel}
      </p>
      <div className="relative -mx-5">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-[#fff5f9] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-[#fff0f5] to-transparent" />
        <div ref={trackRef} className="flex w-max gap-4 px-4 will-change-transform">
          {DUPLICATED.map((item, i) => (
            <figure
              key={`${item.id}-${i}`}
              className="flex w-36 shrink-0 flex-col gap-2 sm:w-44"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/70 shadow-lg shadow-rose-200/40">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const t = e.currentTarget
                    t.onerror = null
                    t.src = `https://placehold.co/300x400/ffc9e0/be185d?text=${encodeURIComponent(item.label)}`
                  }}
                />
              </div>
              <figcaption className="text-center text-xs font-medium text-rose-800/80">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
