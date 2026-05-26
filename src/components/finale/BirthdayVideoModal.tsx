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
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Birthday video"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md"
          >
            Close ✕
          </button>
          <motion.div
            className="aspect-video w-full max-w-3xl overflow-hidden rounded-2xl shadow-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
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
