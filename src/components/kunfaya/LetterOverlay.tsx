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
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Letter from the heart"
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            className="absolute inset-0"
            style={{
              background: 'rgba(10,10,15,0.7)',
              backdropFilter: 'blur(32px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(32px) saturate(1.2)',
            }}
            onClick={onClose}
            aria-label="Close letter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Letter card */}
          <motion.article
            className="relative z-10 w-full max-w-md"
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{ perspective: 1200 }}
          >
            <div
              className="relative overflow-hidden rounded-sm px-8 py-10 sm:px-10 sm:py-12"
              style={{
                background: 'linear-gradient(168deg, #fffef9 0%, #faf6ee 40%, #f5ebe0 100%)',
                boxShadow: '0 30px 100px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              {/* Paper texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Margin line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-rose-medium/20" />

              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-burgundy/10"
                aria-label="Close"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-burgundy/50">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Letter content */}
              <div className="pl-4">
                {/* Salutation */}
                <p className="mb-4 font-display text-lg italic text-burgundy/70">
                  For Mumma,
                </p>
                
                {/* Message body */}
                <p className="font-body text-[15px] leading-[1.9] tracking-[0.005em] text-burgundy/85 sm:text-base">
                  {message}
                </p>
                
                {/* Sign off */}
                <div className="mt-8 flex items-center justify-end gap-2">
                  <span className="h-px w-8 bg-rose-medium/30" />
                  <span className="text-rose-accent">&#10084;</span>
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
