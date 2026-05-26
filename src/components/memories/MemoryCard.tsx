import { motion } from 'framer-motion'
import type { MemoryItem } from '../../types'

interface MemoryCardProps {
  memory: MemoryItem
  isFlipped: boolean
  onFlip: () => void
  stackIndex: number
  total: number
}

export function MemoryCard({
  memory,
  isFlipped,
  onFlip,
  stackIndex,
  total,
}: MemoryCardProps) {
  const offset = (total - 1 - stackIndex) * 6
  const scale = 1 - (total - 1 - stackIndex) * 0.04
  const zIndex = stackIndex

  return (
    <motion.button
      type="button"
      onClick={onFlip}
      className="absolute left-1/2 top-0 w-[min(88vw,320px)] -translate-x-1/2"
      style={{
        zIndex,
        transform: `translateX(-50%) translateY(${offset}px) scale(${scale})`,
        transformOrigin: 'center top',
      }}
      whileTap={{ scale: scale * 0.98 }}
      aria-label={`Memory: ${memory.title}. ${isFlipped ? 'Showing caption' : 'Tap to flip'}`}
    >
      <div
        className="relative h-[min(58vh,420px)] w-full"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 overflow-hidden rounded-3xl border border-white/60 shadow-[0_20px_60px_rgba(255,158,197,0.35)] backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={memory.image}
              alt={memory.title}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                const t = e.currentTarget
                t.onerror = null
                t.src = `https://placehold.co/400x520/ffd6e8/9d174d?text=${encodeURIComponent(memory.title)}`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-rose-900/50 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-left font-display text-lg font-semibold text-white drop-shadow-md">
              {memory.title}
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-rose-200/80 bg-gradient-to-br from-rose-50 to-pink-100 p-8 shadow-[0_20px_60px_rgba(255,158,197,0.35)]"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span className="mb-4 text-3xl">❤️</span>
            <p className="text-center font-body text-base leading-relaxed text-rose-900/90">
              {memory.caption}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.button>
  )
}
