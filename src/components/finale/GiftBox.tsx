import { motion } from 'framer-motion'
import useSound from 'use-sound'
import { ASSETS } from '../../lib/constants'

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
      className="flex flex-col items-center gap-6"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      {/* Instruction text */}
      <p className="font-body text-sm text-cream/60">Your gift awaits</p>

      {/* Gift box button */}
      <motion.button
        type="button"
        onClick={handleOpen}
        className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-4 focus-visible:ring-offset-night rounded-xl"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Open gift"
      >
        <div className="relative h-40 w-40 sm:h-48 sm:w-48">
          {/* Shadow */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-4 w-[90%] rounded-[50%] bg-black/40 blur-lg"
          />

          {/* Box base */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[75%] rounded-lg"
            style={{
              background: 'linear-gradient(135deg, var(--color-rose-accent) 0%, var(--color-burgundy) 100%)',
              boxShadow: '0 20px 50px rgba(199,106,94,0.4), inset 0 -5px 20px rgba(0,0,0,0.2)',
            }}
          >
            {/* Box texture lines */}
            <div className="absolute inset-0 rounded-lg overflow-hidden opacity-20">
              <div className="absolute inset-y-0 left-1/4 w-px bg-white/30" />
              <div className="absolute inset-y-0 right-1/4 w-px bg-white/30" />
            </div>
          </div>

          {/* Ribbon vertical */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[75%] w-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-gold-deep) 0%, var(--color-gold) 50%, var(--color-gold-deep) 100%)',
              boxShadow: '0 0 15px rgba(212,165,116,0.3)',
            }}
          />

          {/* Ribbon horizontal */}
          <div 
            className="absolute left-0 right-0 top-[45%] h-5"
            style={{
              background: 'linear-gradient(180deg, var(--color-gold-deep) 0%, var(--color-gold) 50%, var(--color-gold-deep) 100%)',
              boxShadow: '0 0 15px rgba(212,165,116,0.3)',
            }}
          />

          {/* Bow */}
          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Bow loops */}
            <div className="relative flex items-center justify-center">
              <div 
                className="absolute h-10 w-14 -left-6 rounded-full -rotate-30"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold-soft), var(--color-gold))',
                  boxShadow: '0 4px 15px rgba(212,165,116,0.4)',
                }}
              />
              <div 
                className="absolute h-10 w-14 -right-6 rounded-full rotate-30"
                style={{
                  background: 'linear-gradient(-135deg, var(--color-gold-soft), var(--color-gold))',
                  boxShadow: '0 4px 15px rgba(212,165,116,0.4)',
                }}
              />
              {/* Center knot */}
              <div 
                className="relative z-10 h-6 w-6 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-deep))',
                  boxShadow: '0 2px 10px rgba(212,165,116,0.5)',
                }}
              />
            </div>
          </motion.div>

          {/* Subtle shine */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[75%] rounded-lg pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
        </div>
      </motion.button>

      {/* Tap hint */}
      <motion.p
        className="font-body text-xs text-cream/40"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to open
      </motion.p>
    </motion.div>
  )
}
