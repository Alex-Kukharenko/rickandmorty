import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { PrivateRoute } from '@components'
import { useAuth } from './context/authProvider'

import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'

const Home = lazy(() => import('@pages').then((m) => ({ default: m.Home })))
const Login = lazy(() => import('@pages').then((m) => ({ default: m.Login })))
const Characters = lazy(() => import('@pages').then((m) => ({ default: m.Characters })))
const CharacterDetail = lazy(() => import('@pages').then((m) => ({ default: m.CharacterDetail })))
const Locations = lazy(() => import('@pages').then((m) => ({ default: m.Locations })))
const LocationDetail = lazy(() => import('@pages').then((m) => ({ default: m.LocationDetail })))
const Episodes = lazy(() => import('@pages').then((m) => ({ default: m.Episodes })))
const EpisodeDetail = lazy(() => import('@pages').then((m) => ({ default: m.EpisodeDetail })))
const NotFound = lazy(() => import('@pages').then((m) => ({ default: m.NotFound })))

export function App() {
  const { user } = useAuth()

  return (
    <MantineProvider>
      <Suspense fallback={<p>Загрузка...</p>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route
              path="/characters"
              element={
                <PrivateRoute>
                  <Characters />
                </PrivateRoute>
              }
            />
            <Route
              path="/characters/:id"
              element={
                <PrivateRoute>
                  <CharacterDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/locations"
              element={
                <PrivateRoute>
                  <Locations />
                </PrivateRoute>
              }
            />
            <Route
              path="/locations/:id"
              element={
                <PrivateRoute>
                  <LocationDetail />
                </PrivateRoute>
              }
            />
            <Route
              path="/episodes"
              element={
                <PrivateRoute>
                  <Episodes />
                </PrivateRoute>
              }
            />
            <Route
              path="/episodes/:id"
              element={
                <PrivateRoute>
                  <EpisodeDetail />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MantineProvider>
  )
}
