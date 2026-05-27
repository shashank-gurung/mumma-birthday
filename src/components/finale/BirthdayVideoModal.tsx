import { motion, AnimatePresence } from 'framer-motion'
import ReactPlayer from 'react-player'
import { ASSETS } from '../../lib/constants'

interface BirthdayVideoModalProps {
  open: boolean
  onClose: () => void
}

export function BirthdayVideoModal({ open, onClose }: BirthdayVideoModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-label="Birthday video"
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'rgba(5,5,8,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-[max(1.5rem,env(safe-area-inset-top))] right-4 z-10 flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm text-cream/80 transition-colors hover:text-cream"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Close
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Video container */}
          <motion.div
            className="relative z-10 aspect-video w-full max-w-4xl overflow-hidden rounded-xl"
            style={{
              boxShadow: '0 30px 100px rgba(0,0,0,0.6)',
            }}
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ReactPlayer
              src={ASSETS.video.birthday}
              width="100%"
              height="100%"
              controls
              playing
              playsInline
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
