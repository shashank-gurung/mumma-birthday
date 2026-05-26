import { useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { COPY } from '../../lib/constants'
import { LetterOverlay } from './LetterOverlay'

type Phase = 'closed' | 'flap' | 'letter' | 'modal'

const PAPER =
  'linear-gradient(155deg, #faf6ee 0%, #f3ebe0 42%, #e8dece 100%)'
const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

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
    const t = setTimeout(() => setPhase('letter'), 720)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'letter') return
    const t = setTimeout(() => setPhase('modal'), 900)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <>
      <div
        data-page-content
        className={`flex flex-col items-center gap-6 transition-opacity duration-500 ${
          showModal ? 'opacity-40 pointer-events-none' : ''
        }`}
      >
        <p className="text-sm text-violet-200/70 tracking-wide">
          {COPY.kunFayaKun.envelopeHint}
        </p>

        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={open}
          className="group relative mx-auto h-[200px] w-[min(88vw,300px)] focus:outline-none disabled:pointer-events-none"
          style={{ perspective: 900 }}
          whileTap={phase === 'closed' ? { scale: 0.98 } : undefined}
          aria-label="Open envelope"
          aria-expanded={open}
        >
          <div
            className="relative h-full w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Shadow base */}
            <div
              className="absolute left-1/2 bottom-2 h-4 w-[88%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-md transition-opacity duration-500"
              style={{ opacity: open ? 0.35 : 0.55 }}
            />

            {/* Envelope body */}
            <div
              className="absolute inset-x-0 bottom-0 h-[68%] overflow-hidden rounded-b-md border border-[#d4c9b8]/80"
              style={{
                background: PAPER,
                boxShadow:
                  '0 8px 28px rgba(30,25,20,0.22), inset 0 1px 0 rgba(255,255,255,0.65)',
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
                style={{ backgroundImage: PAPER_TEXTURE }}
              />
              {/* Side fold lines */}
              <div
                className="absolute left-0 top-0 h-full w-[42%] opacity-[0.12]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, transparent 55%)',
                  clipPath: 'polygon(0 0, 100% 0, 0 100%)',
                }}
              />
              <div
                className="absolute right-0 top-0 h-full w-[42%] opacity-[0.12]"
                style={{
                  background:
                    'linear-gradient(-135deg, rgba(0,0,0,0.08) 0%, transparent 55%)',
                  clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                }}
              />
              {/* Bottom V crease */}
              <div
                className="absolute inset-x-0 bottom-0 h-[55%] opacity-[0.07]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.15), transparent)',
                  clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
                }}
              />
            </div>

            {/* Inner letter — emerges before modal */}
            <motion.div
              className="absolute left-[12%] right-[12%] z-[2] overflow-hidden rounded-t-sm border border-[#e0d5c4]/90"
              style={{
                background: 'linear-gradient(180deg, #fffef9, #f8f4ec)',
                boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
                height: '58%',
                bottom: '22%',
              }}
              initial={{ y: 0 }}
              animate={{
                y: phase === 'letter' || phase === 'modal' ? '-115%' : 0,
                opacity: phase === 'modal' ? 0 : 1,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex h-full flex-col items-center justify-end pb-4">
                <div className="mb-2 h-0.5 w-12 rounded-full bg-rose-200/50" />
                <span className="font-display text-xs italic text-stone-500/70">
                  A letter for you…
                </span>
              </div>
            </motion.div>

            {/* Front pocket lip */}
            <div
              className="absolute inset-x-0 z-[3] h-[38%] bottom-0 pointer-events-none"
              style={{
                background: PAPER,
                clipPath: 'polygon(0 35%, 50% 0, 100% 35%, 100% 100%, 0 100%)',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4)',
                borderBottom: '1px solid #d4c9b8',
              }}
            >
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{ backgroundImage: PAPER_TEXTURE }}
              />
            </div>

            {/* Top flap */}
            <motion.div
              className="absolute inset-x-0 top-[8%] z-[4] h-[48%] origin-top"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateX: phase !== 'closed' ? -168 : 0,
                z: phase !== 'closed' ? -20 : 0,
              }}
              transition={{
                duration: 0.72,
                ease: [0.33, 1, 0.38, 1],
              }}
            >
              <div
                className="h-full w-full border border-[#d4c9b8]/70"
                style={{
                  background: 'linear-gradient(180deg, #f8f2e8 0%, #ebe3d2 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  boxShadow:
                    phase === 'closed'
                      ? '0 6px 16px rgba(30,25,20,0.15)'
                      : '0 2px 8px rgba(30,25,20,0.1)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{ backgroundImage: PAPER_TEXTURE }}
                />
                {/* Wax seal hint */}
                <div className="absolute left-1/2 bottom-[18%] flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-rose-300/25 ring-1 ring-rose-400/30">
                  <span className="text-[10px] text-rose-600/70">❤</span>
                </div>
              </div>
              {/* Flap underside when open */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background: '#e5dcc8',
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
