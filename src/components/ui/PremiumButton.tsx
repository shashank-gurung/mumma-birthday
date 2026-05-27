import { motion, type HTMLMotionProps } from 'framer-motion'
import { Link } from 'react-router-dom'

type PremiumButtonProps = HTMLMotionProps<'button'> & {
  to?: string
  variant?: 'rose' | 'night' | 'gold'
  size?: 'default' | 'large'
  children: React.ReactNode
}

const variants = {
  rose: {
    base: 'bg-gradient-to-r from-rose-deep via-rose-accent to-rose-deep text-cream border-rose-medium/30',
    shadow: '0 8px 40px rgba(199, 106, 94, 0.35), 0 2px 8px rgba(199, 106, 94, 0.2)',
    hoverShadow: '0 12px 50px rgba(199, 106, 94, 0.45), 0 4px 12px rgba(199, 106, 94, 0.3)',
  },
  night: {
    base: 'bg-gradient-to-r from-violet-deep via-night-soft to-violet-deep text-gold-soft border-gold/20',
    shadow: '0 8px 40px rgba(42, 31, 61, 0.5), 0 2px 8px rgba(212, 165, 116, 0.15)',
    hoverShadow: '0 12px 50px rgba(42, 31, 61, 0.6), 0 4px 12px rgba(212, 165, 116, 0.25)',
  },
  gold: {
    base: 'bg-gradient-to-r from-gold via-gold-soft to-gold text-burgundy border-gold-deep/40',
    shadow: '0 8px 40px rgba(212, 165, 116, 0.4), 0 2px 8px rgba(184, 149, 106, 0.3)',
    hoverShadow: '0 12px 50px rgba(212, 165, 116, 0.5), 0 4px 12px rgba(184, 149, 106, 0.4)',
  },
}

export function PremiumButton({
  to,
  variant = 'rose',
  size = 'default',
  children,
  className = '',
  ...props
}: PremiumButtonProps) {
  const v = variants[variant]
  const sizeClasses = size === 'large' 
    ? 'px-10 py-5 text-base tracking-wide' 
    : 'px-8 py-4 text-sm tracking-wide'
  
  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 
    rounded-full font-body font-medium
    border backdrop-blur-sm overflow-hidden
    transition-shadow duration-500 ease-out
    ${v.base} ${sizeClasses} ${className}
  `.trim()

  const content = (
    <>
      {/* Subtle shine effect */}
      <span 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
        }}
      />
      {/* Inner glow on hover */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/5" />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (to) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        <Link 
          to={to} 
          className={`group ${baseClasses}`}
          style={{ boxShadow: v.shadow }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = v.hoverShadow
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = v.shadow
          }}
        >
          {content}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button
      type="button"
      className={`group ${baseClasses}`}
      style={{ boxShadow: v.shadow }}
      whileHover={{ scale: 1.02, boxShadow: v.hoverShadow }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {content}
    </motion.button>
  )
}
