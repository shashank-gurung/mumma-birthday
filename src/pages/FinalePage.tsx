import { useState } from 'react'
import { motion } from 'framer-motion'
import { ConfettiBurst } from '../components/effects/ConfettiBurst'
import { FloatingHearts } from '../components/effects/FloatingHearts'
import { InteractiveCake } from '../components/finale/InteractiveCake'
import { SectionContainer } from '../components/ui/SectionContainer'

export function FinalePage() {
  const [candlesOut, setCandlesOut] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleCandlesOut = () => {
    setCandlesOut(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 7000)
  }

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Dynamic background */}
      <motion.div
        className="fixed inset-0 -z-10 transition-all duration-[2s]"
        animate={{
          background: candlesOut
            ? 'linear-gradient(170deg, #0f0a12 0%, #1a1020 30%, #150d18 60%, #0a0810 100%)'
            : 'linear-gradient(170deg, #fffaf5 0%, #fff0eb 30%, #ffe8e0 60%, #ffdfd5 100%)',
        }}
        transition={{ duration: 2 }}
      />

      {/* Ambient glow when candles out */}
      {candlesOut && (
        <motion.div
          className="fixed inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[40vh] w-[60vw] rounded-full opacity-30"
            style={{
              background:
                'radial-gradient(ellipse, rgba(199,106,94,0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </motion.div>
      )}

      {/* Effects */}
      <ConfettiBurst active={showConfetti} />
      {candlesOut && <FloatingHearts />}

      <SectionContainer className="justify-center min-h-[100dvh]">
        {/* Page title */}
        <motion.div
          data-page-content
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: candlesOut ? 0.6 : 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <span
              className="h-px w-8"
              style={{
                background: candlesOut
                  ? 'var(--color-gold-soft)'
                  : 'var(--color-rose-deep)',
              }}
            />
            <span
              className="h-1 w-1 rounded-full"
              style={{
                background: candlesOut
                  ? 'var(--color-gold-soft)'
                  : 'var(--color-rose-deep)',
              }}
            />
            <span
              className="h-px w-8"
              style={{
                background: candlesOut
                  ? 'var(--color-gold-soft)'
                  : 'var(--color-rose-deep)',
              }}
            />
          </motion.div>

          <motion.h1
            className="font-display text-2xl font-medium sm:text-3xl"
            animate={{
              color: candlesOut
                ? 'var(--color-gold-soft)'
                : 'var(--color-burgundy)',
            }}
            transition={{ duration: 1.5 }}
          >
            {candlesOut
              ? 'Happy Birthday, Mumma & Massi ❤️'
              : 'Make a wish, Mumma & Massi ❤️'}
          </motion.h1>

          {!candlesOut && (
            <motion.p
              className="font-body text-sm text-rose-deep/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Close your eyes and make it special
            </motion.p>
          )}
        </motion.div>

        {/* Cake */}
        {!candlesOut && (
          <InteractiveCake onCandlesOut={handleCandlesOut} />
        )}

        {/* Surprise Button */}
        {candlesOut && (
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-center text-gold-soft">
              A special surprise is waiting for you ✨
            </p>

            <a
              href="https://drive.google.com/file/d/1He5D2yhIyaK1R6LceitccPUW2ceL4o2i/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-pink-500 px-8 py-4 text-white text-lg font-medium shadow-lg transition hover:scale-105"
            >
              🎥 Watch Birthday Video
            </a>
          </div>
        )}

        {/* Final Message */}
        {candlesOut && (
          <motion.p
            className="max-w-xs text-center font-display text-sm italic text-gold-soft/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Thank you both for being the light of my life ❤️
          </motion.p>
        )}
      </SectionContainer>
    </div>
  )
}