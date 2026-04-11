import { MainLayout } from './layout/MainLayout'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Characters } from './pages/Characters'
import { CharacterDetail } from './pages/CharacterDetail'
import { Locations } from './pages/Locations'
import { LocationDetail } from './pages/LocationDetail'
import { Episodes } from './pages/Episodes'
import { EpisodeDetail } from './pages/EpisodeDetail'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:id" element={<EpisodeDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

