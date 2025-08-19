import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthorizedLayout, NotAuthorizedLayout } from '@/layouts'

import { Routes as RoutesConfig } from './'

const HomePage = lazy(() =>
  import('@/pages').then((module) => ({ default: module.HomePage }))
)
const LoginPage = lazy(() =>
  import('@/features/auth').then((module) => ({ default: module.LoginPage }))
)
const RegisterPage = lazy(() =>
  import('@/features/auth').then((module) => ({
    default: module.RegisterPage
  }))
)
const ActivateAccountPage = lazy(() =>
  import('@/features/auth').then((module) => ({
    default: module.ActivateAccountPage
  }))
)
const SettingsPage = lazy(() =>
  import('@/features/userSettings').then((module) => ({
    default: module.SettingsPage
  }))
)

export const AppRouter = () => {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route element={<AuthorizedLayout />}>
            <Route path={RoutesConfig.home} element={<HomePage />} />
            <Route
              path={RoutesConfig.settings.account}
              element={<SettingsPage />}
            />
          </Route>

          <Route element={<NotAuthorizedLayout />}>
            <Route path={RoutesConfig.login} element={<LoginPage />} />
            <Route path={RoutesConfig.register} element={<RegisterPage />} />
            <Route
              path={`${RoutesConfig.activate}/:userId`}
              element={<ActivateAccountPage />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}
