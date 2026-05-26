import { Route, Routes } from 'react-router-dom'
import { ExperienceLayout } from '../layouts/ExperienceLayout'
import { LandingPage } from '../pages/LandingPage'
import { MemoriesPage } from '../pages/MemoriesPage'
import { KunFayaKunPage } from '../pages/KunFayaKunPage'
import { NightPage } from '../pages/NightPage'
import { FinalePage } from '../pages/FinalePage'
import { ROUTES } from './paths'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<ExperienceLayout />}>
        <Route path={ROUTES.landing} element={<LandingPage />} />
        <Route path={ROUTES.memories} element={<MemoriesPage />} />
        <Route path={ROUTES.kunFayaKun} element={<KunFayaKunPage />} />
        <Route path={ROUTES.night} element={<NightPage />} />
        <Route path={ROUTES.finale} element={<FinalePage />} />
      </Route>
    </Routes>
  )
}
