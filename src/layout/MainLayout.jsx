import { NavLink, Outlet } from 'react-router-dom'
import { AuthStatus } from '../pages/components/AuthStatus/AuthStatus'
import { useAuth } from '../context/authProvider'
import styles from './MainLayout.module.css'

export function MainLayout() {
  const { user } = useAuth()

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoRick}>Rick</span>
          <span className={styles.logoAnd}>&</span>
          <span className={styles.logoMorty}>Morty</span>
        </NavLink>
        <nav className={styles.nav}>
          {!user && (
            <NavLink
              to="/login"
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            >
              Войти
            </NavLink>
          )}
          <NavLink
            to="/characters"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Персонажи
          </NavLink>
          <NavLink
            to="/locations"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Локации
          </NavLink>
          <NavLink
            to="/episodes"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Эпизоды
          </NavLink>

          <AuthStatus />
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
