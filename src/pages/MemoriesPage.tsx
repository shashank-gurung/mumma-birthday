import { DreamyPinkBackground } from '../components/backgrounds/DreamyPinkBackground'
import { FlashMemoryDeck } from '../components/memories/FlashMemoryDeck'
import { MemoriesCarousel } from '../components/memories/MemoriesCarousel'
import { PremiumButton } from '../components/ui/PremiumButton'
import { PageTitle } from '../components/ui/PageTitle'
import { SectionContainer } from '../components/ui/SectionContainer'
import { COPY } from '../lib/constants'
import { ROUTES } from '../routes/paths'

export function MemoriesPage() {
  return (
    <div className="relative min-h-[100dvh] w-full">
      <DreamyPinkBackground />
      <SectionContainer>
        <PageTitle theme="pink">{COPY.memories.title}</PageTitle>
        <FlashMemoryDeck />
        <MemoriesCarousel />
        <PremiumButton to={ROUTES.kunFayaKun} variant="pink">
          Continue the journey ✨
        </PremiumButton>
      </SectionContainer>
    </div>
  )
}
