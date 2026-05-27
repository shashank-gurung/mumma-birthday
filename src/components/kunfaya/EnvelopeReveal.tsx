import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { COPY } from '../../lib/constants'
import { LetterOverlay } from './LetterOverlay'

type Phase = 'closed' | 'flap' | 'letter' | 'modal'

export function EnvelopeReveal() {
  const [phase, setPhase] = useState<Phase>('closed')

  const open = phase !== 'closed'
  const showModal = phase === 'modal'

  const handleOpen = useCallback(() => {
    if (phase !== 'closed') return
    setPhase('flap')
  }, [phase])

  const handleClose = useCallback(() => {
    setPhase('closed')
  }, [])

  useEffect(() => {
    if (phase !== 'flap') return
    const t = setTimeout(() => setPhase('letter'), 750)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'letter') return
    const t = setTimeout(() => setPhase('modal'), 950)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <>
      <div
        data-page-content
        className={`flex flex-col items-center gap-8 transition-opacity duration-600 ${
          showModal ? 'opacity-30 pointer-events-none' : ''
        }`}
      >
        {/* Instruction text */}
        <p className="font-body text-xs font-light uppercase tracking-[0.25em] text-gold-soft/40">
          A letter awaits
        </p>

        {/* Envelope container */}
        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={open}
          className="group relative mx-auto h-[200px] w-[min(85vw,280px)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-4 focus-visible:ring-offset-night disabled:pointer-events-none"
          style={{ perspective: 1000 }}
          whileTap={phase === 'closed' ? { scale: 0.98 } : undefined}
          aria-label="Open envelope"
          aria-expanded={open}
        >
          <div
            className="relative h-full w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Shadow */}
            <div
              className="absolute left-1/2 bottom-1 h-4 w-[85%] -translate-x-1/2 rounded-[50%] bg-black/40 blur-lg transition-opacity duration-500"
              style={{ opacity: open ? 0.3 : 0.5 }}
            />

            {/* Envelope body */}
            <div
              className="absolute inset-x-0 bottom-0 h-[65%] overflow-hidden rounded-b-md"
              style={{
                background: 'linear-gradient(155deg, #f5e6c8 0%, #e8d4b0 50%, #d4c4a0 100%)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
                border: '1px solid rgba(212,165,116,0.3)',
              }}
            >
              {/* Paper texture */}
              <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Fold shadows */}
              <div
                className="absolute left-0 top-0 h-full w-[45%] opacity-10"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, transparent 50%)',
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                }}
              />
              <div
                className="absolute right-0 top-0 h-full w-[45%] opacity-10"
                style={{
                  background: 'linear-gradient(-135deg, rgba(0,0,0,0.1) 0%, transparent 50%)',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                }}
              />
            </div>

            {/* Inner letter */}
            <motion.div
              className="absolute left-[10%] right-[10%] z-[2] overflow-hidden rounded-t-sm"
              style={{
                background: 'linear-gradient(180deg, #fffef9 0%, #faf6ee 100%)',
                boxShadow: '0 -2px 15px rgba(0,0,0,0.08)',
                border: '1px solid rgba(212,165,116,0.2)',
                height: '55%',
                bottom: '20%',
              }}
              initial={{ y: 0 }}
              animate={{
                y: phase === 'letter' || phase === 'modal' ? '-120%' : 0,
                opacity: phase === 'modal' ? 0 : 1,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex h-full flex-col items-center justify-end pb-5">
                <div className="mb-2 h-px w-10 bg-gold/30" />
                <span className="font-display text-xs italic text-burgundy/50">
                  A letter for you...
                </span>
              </div>
            </motion.div>

            {/* Front pocket */}
            <div
              className="absolute inset-x-0 z-[3] h-[36%] bottom-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, #f5e6c8 0%, #e8d4b0 100%)',
                clipPath: 'polygon(0 32%, 50% 0, 100% 32%, 100% 100%, 0 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)',
                borderBottom: '1px solid rgba(184,149,106,0.4)',
              }}
            />

            {/* Top flap */}
            <motion.div
              className="absolute inset-x-0 top-[10%] z-[4] h-[46%] origin-top"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateX: phase !== 'closed' ? -165 : 0,
                z: phase !== 'closed' ? -15 : 0,
              }}
              transition={{
                duration: 0.75,
                ease: [0.33, 1, 0.38, 1],
              }}
            >
              <div
                className="h-full w-full"
                style={{
                  background: 'linear-gradient(180deg, #f0dfc4 0%, #e5d3b5 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  boxShadow: phase === 'closed' ? '0 8px 20px rgba(0,0,0,0.15)' : 'none',
                  border: '1px solid rgba(184,149,106,0.3)',
                }}
              >
                {/* Wax seal */}
                <div className="absolute left-1/2 bottom-[20%] -translate-x-1/2">
                  <div 
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-rose-accent), var(--color-burgundy))',
                      boxShadow: '0 2px 8px rgba(139,58,58,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                  >
                    <span className="text-xs text-cream/90">&#10084;</span>
                  </div>
                </div>
              </div>
              
              {/* Flap underside */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background: '#d4c4a0',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transform: 'rotateX(180deg)',
                  transformOrigin: 'top center',
                }}
              />
            </motion.div>
          </div>
        </motion.button>
      </div>

      <LetterOverlay
        open={showModal}
        message={COPY.kunFayaKun.hiddenMessage}
        onClose={handleClose}
      />
    </>
  )
}
