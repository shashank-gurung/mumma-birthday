import { NightSkyBackground } from '../components/backgrounds/NightSkyBackground'
import { PremiumButton } from '../components/ui/PremiumButton'
import { PageTitle } from '../components/ui/PageTitle'
import { SectionContainer } from '../components/ui/SectionContainer'
import { COPY } from '../lib/constants'
import { ROUTES } from '../routes/paths'

export function NightPage() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <NightSkyBackground />
      <SectionContainer className="min-h-[100dvh] justify-center">
        <PageTitle theme="night">{COPY.night.title}</PageTitle>
        <p
          data-page-content
          className="text-center font-body text-sm leading-relaxed text-violet-200/50 max-w-md px-2"
        >
          The aangan still waits for our footsteps. The stars remember every story you told me.
        </p>
        <PremiumButton to={ROUTES.finale} variant="gold">
          One last surprise 🎂
        </PremiumButton>
      </SectionContainer>
    </div>
  )
}
