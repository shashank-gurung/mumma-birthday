export const ROUTES = {
  landing: '/',
  memories: '/memories',
  kunFayaKun: '/kun-faya-kun',
  night: '/night',
  finale: '/finale',
} as const

export type RouteKey = keyof typeof ROUTES

export const ROUTE_ORDER: RouteKey[] = [
  'landing',
  'memories',
  'kunFayaKun',
  'night',
  'finale',
]
