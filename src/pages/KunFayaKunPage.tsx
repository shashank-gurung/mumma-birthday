import { KunFayaBackground } from '../components/backgrounds/KunFayaBackground'
import { CustomAudioPlayer } from '../components/kunfaya/CustomAudioPlayer'
import { EnvelopeReveal } from '../components/kunfaya/EnvelopeReveal'
import { PremiumButton } from '../components/ui/PremiumButton'
import { PageTitle } from '../components/ui/PageTitle'
import { SectionContainer } from '../components/ui/SectionContainer'
import { COPY } from '../lib/constants'
import { ROUTES } from '../routes/paths'

export function KunFayaKunPage() {
  return (
    <div className="relative min-h-[100dvh] w-full text-violet-50" id="kun-faya-page">
      <KunFayaBackground />
      <SectionContainer className="gap-10">
        <PageTitle theme="night" className="!text-violet-100">
          {COPY.kunFayaKun.title}
        </PageTitle>
        <CustomAudioPlayer />
        <EnvelopeReveal />
        <PremiumButton to={ROUTES.night} variant="night">
          Those quiet nights →
        </PremiumButton>
      </SectionContainer>
    </div>
  )
}
