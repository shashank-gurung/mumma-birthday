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
  const offset = (total - 1 - stackIndex) * 8
  const scale = 1 - (total - 1 - stackIndex) * 0.035
  const zIndex = stackIndex
  const rotation = (total - 1 - stackIndex) * 1.5

  return (
    <motion.button
      type="button"
      onClick={onFlip}
      className="absolute left-1/2 top-0 w-[min(85vw,300px)] -translate-x-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-accent/50 focus-visible:ring-offset-4 rounded-2xl"
      style={{
        zIndex,
        transform: `translateX(-50%) translateY(${offset}px) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center top',
      }}
      whileTap={{ scale: scale * 0.98 }}
      aria-label={`Memory: ${memory.title}. ${isFlipped ? 'Showing caption' : 'Tap to flip'}`}
    >
      <div
        className="relative h-[min(55vh,400px)] w-full"
        style={{ perspective: 1200 }}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
        >
          {/* Front - Image side */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl backface-hidden"
            style={{ 
              backfaceVisibility: 'hidden',
              boxShadow: '0 25px 60px rgba(139, 58, 58, 0.15), 0 10px 25px rgba(139, 58, 58, 0.1)',
            }}
          >
            {/* Image */}
            <img
              src={memory.image}
              alt={memory.title}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                const t = e.currentTarget
                t.onerror = null
                t.src = `https://placehold.co/400x520/ffdfd5/8b3a3a?text=${encodeURIComponent(memory.title)}`
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/70 via-burgundy/20 to-transparent" />
            
            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-display text-xl font-medium text-cream tracking-wide">
                {memory.title}
              </p>
            </div>

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 ring-inset" />
          </div>

          {/* Back - Caption side */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-8"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(165deg, #fffaf5 0%, #fff0eb 50%, #ffe8e0 100%)',
              boxShadow: '0 25px 60px rgba(139, 58, 58, 0.15), 0 10px 25px rgba(139, 58, 58, 0.1)',
            }}
          >
            {/* Decorative element */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-rose-medium/40" />
              <span className="text-rose-accent text-sm">&#10084;</span>
              <span className="h-px w-8 bg-rose-medium/40" />
            </div>
            
            <p className="text-center font-body text-base leading-relaxed text-burgundy/80">
              {memory.caption}
            </p>

            {/* Decorative bottom */}
            <div className="mt-6 h-px w-12 bg-rose-medium/30" />

            {/* Subtle border */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-rose-medium/20 ring-inset" />
          </div>
        </motion.div>
      </div>
    </motion.button>
  )
}
