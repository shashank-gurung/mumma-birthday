import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ExperienceNav } from '../components/navigation/ExperienceNav'
import { PageProgress } from '../components/navigation/PageProgress'
import { usePageTransition } from '../hooks/usePageTransition'
import { ROUTES } from '../routes/paths'

export function ExperienceLayout() {
  const location = useLocation()
  usePageTransition()

  const isLanding = location.pathname === ROUTES.landing
  const isFinale = location.pathname === ROUTES.finale

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden">
      {!isLanding && (
        <>
          <PageProgress />
          <ExperienceNav />
        </>
      )}
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
      {!isLanding && !isFinale && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-black/10 to-transparent" />
      )}
    </div>
  )
}
