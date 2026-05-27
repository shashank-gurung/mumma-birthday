import { motion } from 'framer-motion'
import { DreamyPinkBackground } from '../components/backgrounds/DreamyPinkBackground'
import { FlashMemoryDeck } from '../components/memories/FlashMemoryDeck'
import { MemoriesCarousel } from '../components/memories/MemoriesCarousel'
import { PremiumButton } from '../components/ui/PremiumButton'
import { PageTitle } from '../components/ui/PageTitle'
import { SectionContainer } from '../components/ui/SectionContainer'
import { ROUTES } from '../routes/paths'

export function MemoriesPage() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <DreamyPinkBackground />
      
      <SectionContainer>
        {/* Page title */}
        <PageTitle theme="rose">
          Moments that made us smile
        </PageTitle>

        {/* Subtitle */}
        <motion.p
          className="max-w-xs text-center font-body text-sm font-light leading-relaxed text-rose-deep/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Every memory with you is a treasure I hold close to my heart
        </motion.p>

        {/* Flash card deck */}
        <FlashMemoryDeck />

        {/* Carousel section */}
        <MemoriesCarousel />

        {/* Navigation button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <PremiumButton to={ROUTES.kunFayaKun} variant="rose">
            Continue the journey
          </PremiumButton>
        </motion.div>
      </SectionContainer>
    </div>
  )
}
