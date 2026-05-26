import { useState } from 'react'
import { motion } from 'framer-motion'
import { ConfettiBurst } from '../components/effects/ConfettiBurst'
import { FloatingHearts } from '../components/effects/FloatingHearts'
import { BirthdayVideoModal } from '../components/finale/BirthdayVideoModal'
import { GiftBox } from '../components/finale/GiftBox'
import { InteractiveCake } from '../components/finale/InteractiveCake'
import { SectionContainer } from '../components/ui/SectionContainer'

export function FinalePage() {
  const [candlesOut, setCandlesOut] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)

  const handleCandlesOut = () => {
    setCandlesOut(true)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 6000)
  }

  const handleGiftOpen = () => setVideoOpen(true)

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <div
        className="fixed inset-0 -z-10 transition-colors duration-[2s]"
        style={{
          background: candlesOut
            ? 'linear-gradient(180deg, #1a0a12 0%, #2d1520 40%, #0f0810 100%)'
            : 'linear-gradient(180deg, #fff5f9 0%, #ffd6e8 50%, #ffb8d4 100%)',
        }}
      />
      <ConfettiBurst active={showConfetti} />
      {candlesOut && <FloatingHearts />}
      <SectionContainer className="justify-center min-h-[100dvh]">
        <motion.h1
          data-page-content
          className="font-display text-center text-2xl font-semibold text-rose-50 sm:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Make a wish, Mumma 🎂
        </motion.h1>

        {!candlesOut && <InteractiveCake onCandlesOut={handleCandlesOut} />}
        {candlesOut && <GiftBox onOpen={handleGiftOpen} />}
      </SectionContainer>
      <BirthdayVideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  )
}
