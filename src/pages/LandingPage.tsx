import { motion } from 'framer-motion'
import { DreamyPinkBackground } from '../components/backgrounds/DreamyPinkBackground'
import { PremiumButton } from '../components/ui/PremiumButton'
import { COPY } from '../lib/constants'
import { ROUTES } from '../routes/paths'

export function LandingPage() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <DreamyPinkBackground />
      <main className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-12 pt-16">
        <motion.div
          data-page-content
          className="flex flex-col items-center gap-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="mb-2 h-px w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
          <motion.h1
            className="font-display text-4xl font-semibold leading-tight text-rose-900 sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {COPY.landing.title.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08 }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            className="max-w-xs font-body text-sm text-rose-800/60 tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            A little journey made with all my love
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <PremiumButton to={ROUTES.memories} variant="pink">
              {COPY.landing.cta}
            </PremiumButton>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
