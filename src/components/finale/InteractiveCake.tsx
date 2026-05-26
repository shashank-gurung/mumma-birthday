import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMicBlow } from '../../hooks/useMicBlow'
import { COPY } from '../../lib/constants'

interface InteractiveCakeProps {
  onCandlesOut: () => void
}

export function InteractiveCake({ onCandlesOut }: InteractiveCakeProps) {
  const [lit, setLit] = useState(true)
  const [startedMic, setStartedMic] = useState(false)

  const extinguish = () => {
    if (!lit) return
    setLit(false)
    onCandlesOut()
  }

  const { start, listening, error } = useMicBlow({
    onBlow: extinguish,
    enabled: lit,
  })

  useEffect(() => {
    if (lit && !startedMic) {
      setStartedMic(true)
      void start()
    }
  }, [lit, start, startedMic])

  return (
    <div data-page-content className="flex flex-col items-center gap-6">
      <motion.div
        className="relative"
        animate={lit ? { y: [0, -4, 0] } : {}}
        transition={{ duration: 2, repeat: lit ? Infinity : 0, ease: 'easeInOut' }}
      >
        {/* Cake */}
        <div className="relative w-56 sm:w-64">
          <div className="h-24 rounded-b-3xl bg-gradient-to-b from-rose-200 to-rose-300 shadow-[0_16px_40px_rgba(251,113,133,0.35)] border border-rose-100" />
          <div className="absolute -top-2 left-2 right-2 h-8 rounded-t-2xl bg-gradient-to-b from-pink-100 to-rose-200 border border-white/50" />
          {/* Candles */}
          <div className="absolute -top-14 left-0 right-0 flex justify-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                onClick={extinguish}
                className="flex flex-col items-center"
                aria-label="Blow out candle"
              >
                <motion.div
                  className="h-6 w-1 rounded-full bg-amber-100"
                  animate={lit ? {} : { opacity: 0.3, height: 4 }}
                />
                <AnimateFlame lit={lit} delay={i * 0.1} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <p className="text-center text-sm text-rose-100/80 max-w-xs">
        {COPY.finale.cakeHint}
      </p>
      {listening && (
        <motion.span
          className="text-xs text-rose-200/60"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          Listening for your blow… 🎤
        </motion.span>
      )}
      {error && <p className="text-xs text-amber-200/70 text-center">{error}</p>}
    </div>
  )
}

function AnimateFlame({ lit, delay }: { lit: boolean; delay: number }) {
  if (!lit) return <span className="h-4 w-2" />

  return (
    <motion.span
      className="block h-5 w-3 rounded-full bg-gradient-to-t from-amber-400 to-yellow-200 shadow-[0_0_12px_rgba(251,191,36,0.8)]"
      animate={{
        scale: [1, 1.15, 0.95, 1],
        opacity: [0.9, 1, 0.85, 0.9],
      }}
      transition={{ duration: 0.4 + delay * 0.05, repeat: Infinity }}
    />
  )
}
