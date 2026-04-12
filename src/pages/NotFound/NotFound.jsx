import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Неверное измерение</h1>
      <p className={styles.subtitle}>Похоже, ты заблудился в мультивселенной.</p>
      <Link to="/" className={styles.btn}>
        Вернуться на главную
      </Link>
    </div>
  )
}
