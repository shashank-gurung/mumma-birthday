import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useMicBlow } from '../../hooks/useMicBlow'

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
    <div data-page-content className="flex flex-col items-center gap-8">
      <motion.div
        className="relative"
        animate={lit ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 3, repeat: lit ? Infinity : 0, ease: 'easeInOut' }}
      >
        {/* Cake container with realistic styling */}
        <div className="relative w-64 sm:w-72">
          {/* Cake plate/base */}
          <div 
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-4 w-[110%] rounded-full"
            style={{
              background: 'linear-gradient(180deg, #e8e0d8 0%, #d4ccc4 100%)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}
          />

          {/* Main cake body */}
          <div 
            className="relative h-28 rounded-b-3xl rounded-t-lg overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #f5e6c8 0%, #e8d4b0 50%, #d4c4a0 100%)',
              boxShadow: '0 20px 50px rgba(139,58,58,0.2), inset 0 -10px 30px rgba(0,0,0,0.1)',
            }}
          >
            {/* Frosting layer */}
            <div 
              className="absolute top-0 left-0 right-0 h-10"
              style={{
                background: 'linear-gradient(180deg, #fff5f0 0%, #ffe8e0 60%, #ffdad0 100%)',
                borderRadius: '8px 8px 0 0',
              }}
            />
            
            {/* Frosting drips */}
            <div className="absolute top-8 left-0 right-0 flex justify-around px-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-b-full"
                  style={{
                    width: 8 + (i % 3) * 4,
                    height: 12 + (i % 4) * 6,
                    background: 'linear-gradient(180deg, #ffdad0, #f5b8aa)',
                  }}
                />
              ))}
            </div>

            {/* Decorative line */}
            <div 
              className="absolute bottom-8 left-4 right-4 h-px"
              style={{ background: 'rgba(212,165,116,0.3)' }}
            />
          </div>

          {/* Candles */}
          <div className="absolute -top-16 left-0 right-0 flex justify-center gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                type="button"
                onClick={extinguish}
                className="flex flex-col items-center focus:outline-none"
                aria-label="Blow out candle"
              >
                {/* Candle stick */}
                <div 
                  className="h-10 w-2 rounded-t-sm"
                  style={{
                    background: 'linear-gradient(90deg, #f5e6c8 0%, #fff 50%, #f5e6c8 100%)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
                {/* Flame */}
                <AnimateFlame lit={lit} delay={i * 0.1} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <div className="text-center">
        <p className="font-body text-sm text-cream/70">
          Blow on the mic or tap the candles
        </p>
        {listening && (
          <motion.span
            className="mt-2 block font-body text-xs text-gold/60"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Listening...
          </motion.span>
        )}
        {error && (
          <p className="mt-2 font-body text-xs text-rose-soft/70">{error}</p>
        )}
      </div>
    </div>
  )
}

function AnimateFlame({ lit, delay }: { lit: boolean; delay: number }) {
  if (!lit) {
    return (
      <motion.div
        className="h-3 w-2"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    )
  }

  return (
    <motion.div
      className="relative -mt-1"
      animate={{
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{ duration: 0.5 + delay * 0.05, repeat: Infinity }}
    >
      {/* Outer glow */}
      <div 
        className="absolute -inset-2 rounded-full opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(255,200,100,0.4) 0%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />
      {/* Flame shape */}
      <div 
        className="relative h-6 w-3 rounded-full"
        style={{
          background: 'linear-gradient(180deg, #fff8e0 0%, #ffd54f 30%, #ff9800 70%, #ff5722 100%)',
          boxShadow: '0 0 12px rgba(255,180,50,0.8), 0 0 24px rgba(255,150,50,0.4)',
        }}
      />
    </motion.div>
  )
}
