import { motion } from 'framer-motion'
import { DreamyPinkBackground } from '../components/backgrounds/DreamyPinkBackground'
import { PremiumButton } from '../components/ui/PremiumButton'
import { COPY } from '../lib/constants'
import { ROUTES } from '../routes/paths'

export function LandingPage() {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <DreamyPinkBackground />
      
      <main className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6 pb-16 pt-20">
        <motion.div
          data-page-content
          className="flex flex-col items-center gap-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          {/* Decorative line */}
          <motion.div
            className="h-px w-16 bg-gradient-to-r from-transparent via-rose-medium to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Main title - cinematic reveal */}
          <div className="flex flex-col items-center gap-3">
            <motion.span
              className="font-body text-xs font-light uppercase tracking-[0.35em] text-rose-deep/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              A celebration of love
            </motion.span>
            
            <motion.h1
              className="font-display text-5xl font-semibold leading-[1.1] text-burgundy sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {COPY.landing.title.replace(' ❤️', '').split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  style={{ marginRight: '0.2em' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Elegant heart accent */}
            <motion.div
              className="mt-2 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <span className="h-px w-8 bg-rose-medium/40" />
              <motion.span 
                className="text-rose-accent text-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
              >
                &#10084;
              </motion.span>
              <span className="h-px w-8 bg-rose-medium/40" />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            className="max-w-xs font-body text-sm font-light leading-relaxed text-rose-deep/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            A journey through cherished memories,
            <br />
            crafted with all my love for you
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <PremiumButton to={ROUTES.memories} variant="rose" size="large">
              Begin the Journey
            </PremiumButton>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2.5, duration: 1 }}
          >
            <motion.div
              className="h-8 w-px bg-gradient-to-b from-rose-deep/30 to-transparent"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
