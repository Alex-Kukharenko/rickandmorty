import { MainLayout } from './layout/MainLayout'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Characters } from './pages/Characters/Characters'
import { CharacterDetail } from './pages/CharacterDetail'
import { Locations } from './pages/Locations/Locations'
import { LocationDetail } from './pages/LocationDetail'
import { Episodes } from './pages/Episodes/Episodes'
import { EpisodeDetail } from './pages/EpisodeDetail'
import { NotFound } from './pages/NotFound/NotFound'
import { Login } from './pages/Login/Login'
import { AuthProvider } from './context/authProvider'
import { PrivateRoute } from './pages/components/PrivateRoute'
export function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
                {' '}
                <EpisodeDetail />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

