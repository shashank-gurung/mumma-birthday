import { motion } from 'framer-motion'
import useSound from 'use-sound'
import { ASSETS, COPY } from '../../lib/constants'

interface GiftBoxProps {
  onOpen: () => void
}

export function GiftBox({ onOpen }: GiftBoxProps) {
  const [playOpen] = useSound(ASSETS.audio.giftOpen, { volume: 0.6, soundEnabled: true })

  const handleOpen = () => {
    playOpen()
    onOpen()
  }

  return (
    <motion.div
      data-page-content
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <p className="text-sm text-amber-100/80">{COPY.finale.giftHint}</p>
      <motion.button
        type="button"
        onClick={handleOpen}
        className="relative focus:outline-none"
        whileHover={{ scale: 1.05, rotate: [-2, 2, -2, 0] }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open gift"
      >
        <div className="relative h-36 w-36 sm:h-44 sm:w-44">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-400 to-pink-600 shadow-[0_20px_50px_rgba(244,63,94,0.45)]" />
          <div className="absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 bg-amber-300/90" />
          <div className="absolute left-1/2 inset-y-0 w-4 -translate-x-1/2 bg-amber-300/90" />
          <motion.div
            className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div
              className="h-full w-full"
              style={{
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
              }}
            />
          </motion.div>
        </div>
        <span className="mt-4 block text-2xl">🎁</span>
      </motion.button>
    </motion.div>
  )
}
