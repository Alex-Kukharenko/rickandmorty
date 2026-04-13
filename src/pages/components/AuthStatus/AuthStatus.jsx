import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/authProvider'
import styles from './AuthStatus.module.css'

export function AuthStatus() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signout(() => navigate('/'))
  }

  if (auth.user === null) {
    return <p className={styles.notAuth}>Необходимо войти!!!!</p>
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.greeting}>Привет, {auth.user}!</p>
      <button className={styles.btn} onClick={handleLogout}>
        Выйти
      </button>
    </div>
  )
}
