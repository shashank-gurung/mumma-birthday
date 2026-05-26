import { motion, type HTMLMotionProps } from 'framer-motion'
import { Link } from 'react-router-dom'

type PremiumButtonProps = HTMLMotionProps<'button'> & {
  to?: string
  variant?: 'pink' | 'night' | 'gold'
  children: React.ReactNode
}

const variants = {
  pink: 'bg-gradient-to-r from-rose-300 via-pink-300 to-rose-200 text-rose-950 shadow-[0_8px_32px_rgba(255,158,197,0.45)] border-rose-200/60',
  night:
    'bg-gradient-to-r from-indigo-900/80 via-violet-900/80 to-indigo-950 text-violet-100 shadow-[0_8px_32px_rgba(99,102,241,0.35)] border-violet-400/30',
  gold: 'bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 text-amber-950 shadow-[0_8px_32px_rgba(212,175,55,0.4)] border-amber-300/60',
}

export function PremiumButton({
  to,
  variant = 'pink',
  children,
  className = '',
  ...props
}: PremiumButtonProps) {
  const base = `relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide border backdrop-blur-sm ${variants[variant]} ${className}`

  const inner = (
    <>
      <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 transition-opacity group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Link to={to} className={`group ${base}`}>
          {inner}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type="button"
      className={`group ${base}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {inner}
    </motion.button>
  )
}
