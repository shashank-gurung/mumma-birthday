import { useState } from 'react'
import { motion } from 'framer-motion'
import { FLASH_MEMORIES } from '../../data/memories'
import { COPY } from '../../lib/constants'
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
      }, 900)
    }
  }

  const visible = FLASH_MEMORIES.slice(
    activeIndex,
    Math.min(activeIndex + 3, FLASH_MEMORIES.length),
  )

  return (
    <div data-page-content className="w-full">
      <p className="mb-6 text-center text-sm text-rose-700/70 tracking-wide">
        {COPY.memories.deckHint}
      </p>
      <div className="relative mx-auto h-[min(62vh,440px)] w-full max-w-[340px]">
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
      <div className="mt-8 flex justify-center gap-2">
        {FLASH_MEMORIES.map((_, i) => (
          <motion.span
            key={i}
            className={`h-1.5 rounded-full ${i <= activeIndex ? 'w-6 bg-rose-400' : 'w-1.5 bg-rose-200'}`}
            layout
          />
        ))}
      </div>
    </div>
  )
}
