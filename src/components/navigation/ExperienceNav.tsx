import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTE_ORDER, ROUTES, type RouteKey } from '../../routes/paths'

const PATH_TO_KEY = Object.fromEntries(
  Object.entries(ROUTES).map(([k, v]) => [v, k]),
) as Record<string, RouteKey>

export function ExperienceNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const currentKey = PATH_TO_KEY[location.pathname]
  const index = ROUTE_ORDER.indexOf(currentKey)

  if (index <= 1) return null

  const prevKey = ROUTE_ORDER[index - 1]
  const prevRoute = ROUTES[prevKey]

  return (
    <motion.button
      type="button"
      onClick={() => navigate(prevRoute)}
      className="fixed left-4 z-50 rounded-full bg-white/15 px-3 py-2 text-xs text-white/90 backdrop-blur-md border border-white/20"
      style={{ top: 'max(3.5rem, calc(env(safe-area-inset-top) + 2.5rem))' }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Go back"
    >
      ← Back
    </motion.button>
  )
}
