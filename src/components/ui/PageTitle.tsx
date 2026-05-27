import { motion } from 'framer-motion'

interface PageTitleProps {
  children: React.ReactNode
  theme?: 'rose' | 'night' | 'gold'
  className?: string
}

const themeStyles = {
  rose: 'text-burgundy',
  night: 'text-gold-soft',
  gold: 'text-cream',
}

export function PageTitle({
  children,
  theme = 'rose',
  className = '',
}: PageTitleProps) {
  return (
    <motion.div
      data-page-content
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4"
    >
      {/* Decorative top line */}
      <motion.div
        className="h-px w-12 bg-current opacity-20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className={`font-display text-center text-2xl leading-[1.3] font-medium tracking-tight sm:text-3xl md:text-4xl px-4 ${themeStyles[theme]} ${className}`}
      >
        {children}
      </motion.h1>

      {/* Decorative bottom element */}
      <motion.div
        className="flex items-center gap-3 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <span className="h-px w-6 bg-current" />
        <span className="h-1 w-1 rounded-full bg-current" />
        <span className="h-px w-6 bg-current" />
      </motion.div>
    </motion.div>
  )
}
