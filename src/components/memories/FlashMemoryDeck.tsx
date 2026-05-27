import { useState } from 'react'
import { motion } from 'framer-motion'
import { FLASH_MEMORIES } from '../../data/memories'
import { MemoryCard } from './MemoryCard'

export function FlashMemoryDeck() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [flippedId, setFlippedId] = useState<string | null>(null)

  const handleFlip = (id: string, index: number) => {
    setFlippedId((prev) => (prev === id ? null : id))
    if (index === activeIndex && index < FLASH_MEMORIES.length - 1) {
      setTimeout(() => {
        setActiveIndex((i) => Math.min(i + 1, FLASH_MEMORIES.length - 1))
        setFlippedId(null)
      }, 1000)
    }
  }

  const visible = FLASH_MEMORIES.slice(
    activeIndex,
    Math.min(activeIndex + 3, FLASH_MEMORIES.length),
  )

  return (
    <div data-page-content className="w-full">
      {/* Instruction text */}
      <motion.p 
        className="mb-8 text-center font-body text-xs font-light uppercase tracking-[0.25em] text-rose-deep/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Tap to reveal
      </motion.p>

      {/* Card deck */}
      <div className="relative mx-auto h-[min(58vh,420px)] w-full max-w-[320px]">
        {visible.map((memory, i) => {
          const globalIndex = activeIndex + i
          return (
            <MemoryCard
              key={memory.id}
              memory={memory}
              isFlipped={flippedId === memory.id}
              onFlip={() => handleFlip(memory.id, globalIndex)}
              stackIndex={visible.length - 1 - i}
              total={visible.length}
            />
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-10 flex justify-center gap-2">
        {FLASH_MEMORIES.map((_, i) => (
          <motion.span
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i <= activeIndex ? 20 : 6,
              backgroundColor: i <= activeIndex 
                ? 'var(--color-rose-accent)' 
                : 'var(--color-rose-soft)',
            }}
            layout
          />
        ))}
      </div>

      {/* Memory count */}
      <motion.p 
        className="mt-4 text-center font-body text-xs text-rose-deep/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {activeIndex + 1} of {FLASH_MEMORIES.length} memories
      </motion.p>
    </div>
  )
}
