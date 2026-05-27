import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function FloatingHearts({ count = 20 }: { count?: number }) {
  const reduced = useReducedMotion()
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${5 + Math.random() * 90}%`,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        scale: 0.6 + Math.random() * 0.6,
        opacity: 0.3 + Math.random() * 0.4,
      })),
    [count],
  )

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ 
            left: h.left, 
            bottom: '-3rem',
          }}
          animate={{
            y: [0, -window.innerHeight * 1.15],
            x: [0, (Math.random() - 0.5) * 60],
            opacity: [0, h.opacity, h.opacity, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <svg
            width={16 * h.scale}
            height={16 * h.scale}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="var(--color-rose-accent)"
              fillOpacity="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
