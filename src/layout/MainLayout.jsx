import { NavLink, Outlet } from 'react-router-dom'
import './MainLayout.css'

export function MainLayout() {
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          <span className="logo-rick">Rick</span>
          <span className="logo-and">&</span>
          <span className="logo-morty">Morty</span>
        </NavLink>
        <nav className="nav">
          <NavLink
            to="/characters"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Персонажи
          </NavLink>
          <NavLink
            to="/locations"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Локации
          </NavLink>
          <NavLink
            to="/episodes"
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Эпизоды
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
