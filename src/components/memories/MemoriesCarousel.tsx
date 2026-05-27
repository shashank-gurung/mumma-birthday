import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { CAROUSEL_MEMORIES } from '../../data/memories'

const DUPLICATED = [...CAROUSEL_MEMORIES, ...CAROUSEL_MEMORIES]

export function MemoriesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !trackRef.current) return
    const track = trackRef.current
    const width = track.scrollWidth / 2

    const tween = gsap.to(track, {
      x: -width,
      duration: width / 35,
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
    <div data-page-content className="w-full overflow-hidden py-4">
      {/* Section label */}
      <p className="mb-6 text-center font-body text-xs font-light uppercase tracking-[0.3em] text-rose-deep/40">
        Endless memories
      </p>

      {/* Carousel container */}
      <div className="relative -mx-5">
        {/* Fade edges */}
        <div 
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16"
          style={{ background: 'linear-gradient(to right, #fffaf5, transparent)' }}
        />
        <div 
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16"
          style={{ background: 'linear-gradient(to left, #fffaf5, transparent)' }}
        />

        {/* Scrolling track */}
        <div ref={trackRef} className="flex w-max gap-5 px-5 will-change-transform">
          {DUPLICATED.map((item, i) => (
            <figure
              key={`${item.id}-${i}`}
              className="flex w-32 shrink-0 flex-col gap-3 sm:w-40"
            >
              {/* Image container */}
              <div 
                className="aspect-[3/4] overflow-hidden rounded-xl"
                style={{
                  boxShadow: '0 15px 40px rgba(139, 58, 58, 0.12), 0 5px 15px rgba(139, 58, 58, 0.08)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    const t = e.currentTarget
                    t.onerror = null
                    t.src = `https://placehold.co/300x400/ffdfd5/8b3a3a?text=${encodeURIComponent(item.label)}`
                  }}
                />
              </div>

              {/* Caption */}
              <figcaption className="text-center font-body text-xs font-light text-burgundy/60">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
