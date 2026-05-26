import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../lib/gsap'

export function usePageTransition() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

    gsap.fromTo(
      '[data-page-content]',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 },
    )
  }, [pathname])
}
