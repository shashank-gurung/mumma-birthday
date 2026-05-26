import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Meteor {
  id: number
  top: number
  left: number
  angle: number
  length: number
  duration: number
  headSize: number
  peakOpacity: number
}

function createMeteor(): Meteor {
  const length = 72 + Math.random() * 88
  const duration = 0.55 + Math.random() * 0.65
  return {
    id: Date.now() + Math.random(),
    top: 4 + Math.random() * 38,
    left: 5 + Math.random() * 75,
    angle: 32 + Math.random() * 18,
    length,
    duration,
    headSize: 1.5 + Math.random() * 1,
    peakOpacity: 0.65 + Math.random() * 0.3,
  }
}

function MeteorStreak({ meteor }: { meteor: Meteor }) {
  const travel = meteor.length * 2.4

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        top: `${meteor.top}%`,
        left: `${meteor.left}%`,
        rotate: `${meteor.angle}deg`,
        transformOrigin: 'left center',
      }}
      initial={{ opacity: 0, x: 0 }}
      animate={{
        opacity: [0, meteor.peakOpacity, meteor.peakOpacity * 0.85, 0],
        x: [0, travel * 0.35, travel],
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: meteor.duration,
        ease: [0.12, 0.82, 0.22, 1],
        times: [0, 0.08, 0.55, 1],
      }}
    >
      <div
        className="relative"
        style={{ width: meteor.length, height: meteor.headSize }}
      >
        {/* Glowing tail — thin, long fade */}
        <div
          className="absolute inset-y-0 left-0 right-0 rounded-full"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              rgba(180, 198, 255, 0.03) 18%,
              rgba(210, 225, 255, 0.12) 42%,
              rgba(235, 242, 255, 0.35) 72%,
              rgba(255, 255, 255, 0.55) 92%,
              rgba(255, 255, 255, 0.75) 100%
            )`,
            filter: 'blur(0.3px)',
            boxShadow: '0 0 6px rgba(200, 220, 255, 0.15)',
          }}
        />
        {/* Bright head */}
        <div
          className="absolute -right-0.5 top-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: meteor.headSize + 1.5,
            height: meteor.headSize + 1.5,
            background:
              'radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.9) 35%, rgba(200,220,255,0.4) 70%, transparent 100%)',
            boxShadow:
              '0 0 4px #fff, 0 0 10px rgba(255,255,255,0.7), 0 0 20px rgba(180,200,255,0.35)',
          }}
        />
        {/* Secondary soft bloom behind head */}
        <div
          className="absolute -right-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
      </div>
    </motion.div>
  )
}

export function ShootingStars() {
  const reduced = useReducedMotion()
  const [meteors, setMeteors] = useState<Meteor[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleNext = useCallback(() => {
    if (reduced) return
    const delay = 5500 + Math.random() * 9000
    timeoutRef.current = setTimeout(() => {
      const meteor = createMeteor()
      setMeteors([meteor])

      setTimeout(() => {
        setMeteors([])
        scheduleNext()
      }, meteor.duration * 1000 + 400)
    }, delay)
  }, [reduced])

  useEffect(() => {
    if (reduced) return

    const initial = setTimeout(() => {
      const meteor = createMeteor()
      setMeteors([meteor])
      setTimeout(() => {
        setMeteors([])
        scheduleNext()
      }, meteor.duration * 1000 + 400)
    }, 2000 + Math.random() * 3000)

    return () => {
      clearTimeout(initial)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [reduced, scheduleNext])

  if (reduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <AnimatePresence mode="popLayout">
        {meteors.map((m) => (
          <MeteorStreak key={m.id} meteor={m} />
        ))}
      </AnimatePresence>
    </div>
  )
}
