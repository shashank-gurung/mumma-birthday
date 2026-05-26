import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface LetterOverlayProps {
  open: boolean
  message: string
  onClose: () => void
}

export function LetterOverlay({ open, message, onClose }: LetterOverlayProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('letter-open')
    } else {
      document.body.classList.remove('letter-open')
    }
    const prev = document.body.style.overflow
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      document.body.classList.remove('letter-open')
      document.body.style.overflow = prev
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-5 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Letter from the heart"
        >
          {/* Dim + heavy blur */}
          <motion.button
            type="button"
            className="absolute inset-0 bg-[#0a0612]/55 backdrop-blur-[28px] backdrop-saturate-150"
            onClick={onClose}
            aria-label="Close letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          <motion.article
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 48, scale: 0.92, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            style={{ perspective: 1200 }}
          >
            <div
              className="relative overflow-hidden rounded-sm px-8 py-10 sm:px-10 sm:py-12 shadow-[0_24px_80px_rgba(0,0,0,0.45),0_4px_20px_rgba(0,0,0,0.2)]"
              style={{
                background:
                  'linear-gradient(168deg, #fffef9 0%, #faf6ee 35%, #f3ebe0 100%)',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.045]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute left-8 top-0 bottom-0 w-px bg-rose-200/30" />

              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-stone-200/60 text-stone-600 transition-colors hover:bg-stone-300/70"
                aria-label="Close"
              >
                ✕
              </button>

              <p className="mb-3 font-display text-lg italic text-stone-500/90">
                For Mumma
              </p>
              <p className="font-body text-[15px] leading-[1.85] tracking-[0.01em] text-stone-700/95 sm:text-base">
                {message}
              </p>
              <p className="mt-8 text-right font-display text-xl text-rose-400/90">
                ❤️
              </p>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
