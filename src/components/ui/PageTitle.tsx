import { motion } from 'framer-motion'

interface PageTitleProps {
  children: React.ReactNode
  theme?: 'pink' | 'night' | 'gold'
  className?: string
}

const themeClass = {
  pink: 'text-rose-900 drop-shadow-[0_2px_24px_rgba(255,182,212,0.8)]',
  night: 'text-violet-50 drop-shadow-[0_2px_24px_rgba(167,139,250,0.5)]',
  gold: 'text-amber-50 drop-shadow-[0_2px_24px_rgba(251,191,36,0.4)]',
}

export function PageTitle({
  children,
  theme = 'pink',
  className = '',
}: PageTitleProps) {
  return (
    <motion.h1
      data-page-content
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`font-display text-center text-2xl leading-snug font-semibold sm:text-3xl md:text-4xl px-4 ${themeClass[theme]} ${className}`}
    >
      {children}
    </motion.h1>
  )
}
