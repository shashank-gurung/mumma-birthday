import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function FloatingHearts({ count = 16 }: { count?: number }) {
  const reduced = useReducedMotion()
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
        scale: 0.5 + Math.random() * 0.8,
      })),
    [count],
  )

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute text-rose-300/70"
          style={{ left: h.left, bottom: '-2rem', fontSize: `${h.scale}rem` }}
          animate={{
            y: [0, -window.innerHeight * 1.1],
            x: [0, (Math.random() - 0.5) * 40],
            opacity: [0, 0.8, 0],
            rotate: [0, 15, -10],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          ❤
        </motion.span>
      ))}
    </div>
  )
}
