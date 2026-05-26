import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ROUTE_ORDER, ROUTES, type RouteKey } from '../../routes/paths'

const PATH_TO_KEY = Object.fromEntries(
  Object.entries(ROUTES).map(([k, v]) => [v, k]),
) as Record<string, RouteKey>

export function PageProgress() {
  const location = useLocation()
  const navigate = useNavigate()
  const currentKey = PATH_TO_KEY[location.pathname] ?? 'landing'
  const currentIndex = ROUTE_ORDER.indexOf(currentKey)

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-[max(0.75rem,env(safe-area-inset-top))]"
      aria-label="Journey progress"
    >
      <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 backdrop-blur-md border border-white/30 shadow-lg">
        {ROUTE_ORDER.slice(1).map((key, i) => {
          const index = i + 1
          const active = index <= currentIndex
          const route = ROUTES[key]
          return (
            <button
              key={key}
              type="button"
              onClick={() => index <= currentIndex && navigate(route)}
              disabled={index > currentIndex}
              className="group relative p-1"
              aria-label={`Step ${index}`}
              aria-current={index === currentIndex ? 'step' : undefined}
            >
              <motion.span
                className={`block h-2 rounded-full transition-colors ${
                  active ? 'bg-rose-400 w-6' : 'bg-white/40 w-2'
                }`}
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
