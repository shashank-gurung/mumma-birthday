import { motion } from 'framer-motion'
import { KunFayaBackground } from '../components/backgrounds/KunFayaBackground'
import { CustomAudioPlayer } from '../components/kunfaya/CustomAudioPlayer'
import { EnvelopeReveal } from '../components/kunfaya/EnvelopeReveal'
import { PremiumButton } from '../components/ui/PremiumButton'
import { PageTitle } from '../components/ui/PageTitle'
import { SectionContainer } from '../components/ui/SectionContainer'
import { ROUTES } from '../routes/paths'

export function KunFayaKunPage() {
  return (
    <div className="relative min-h-[100dvh] w-full" id="kun-faya-page">
      <KunFayaBackground />
      
      <SectionContainer className="gap-12">
        {/* Page title */}
        <PageTitle theme="night">
          A melody we shared
        </PageTitle>

        {/* Subtitle */}
        <motion.p
          className="max-w-xs text-center font-body text-sm font-light leading-relaxed text-gold-soft/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          I miss singing and listening to this with you
        </motion.p>

        {/* Audio player */}
        <CustomAudioPlayer />

        {/* Envelope reveal */}
        <EnvelopeReveal />

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <PremiumButton to={ROUTES.night} variant="night">
            Those quiet nights
          </PremiumButton>
        </motion.div>
      </SectionContainer>
    </div>
  )
}
