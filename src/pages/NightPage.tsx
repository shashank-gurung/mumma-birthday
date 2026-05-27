import { motion } from 'framer-motion'
import { NightSkyBackground } from '../components/backgrounds/NightSkyBackground'
import { PremiumButton } from '../components/ui/PremiumButton'
import { SectionContainer } from '../components/ui/SectionContainer'
import { ROUTES } from '../routes/paths'

export function NightPage() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <NightSkyBackground />
      
      <SectionContainer className="min-h-[100dvh] justify-center">
        {/* Main content */}
        <motion.div
          data-page-content
          className="flex flex-col items-center gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {/* Decorative top element */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="h-px w-8 bg-gold-soft/40" />
            <span className="h-1 w-1 rounded-full bg-gold-soft/60" />
            <span className="h-px w-8 bg-gold-soft/40" />
          </motion.div>

          {/* Title */}
          <motion.h1
            className="font-display text-3xl font-medium leading-[1.3] text-gold-soft sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Under the same sky
          </motion.h1>

          {/* Poetic description */}
          <motion.p
            className="max-w-sm font-body text-sm font-light leading-[1.8] text-gold-soft/40 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            I miss those nights when we used to walk in the aangan
            <br />
            and talk for hours under the stars
          </motion.p>

          {/* Memory text */}
          <motion.div
            className="mt-4 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="font-display text-base italic leading-relaxed text-gold-soft/25">
              The stars still remember every story you told me.
              The aangan still waits for our footsteps.
            </p>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            className="mt-6 h-16 w-px"
            style={{
              background: 'linear-gradient(to bottom, var(--color-gold-soft), transparent)',
              opacity: 0.2,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          />
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <PremiumButton to={ROUTES.finale} variant="gold">
            One last surprise
          </PremiumButton>
        </motion.div>
      </SectionContainer>
    </div>
  )
}
