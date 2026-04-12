import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span>RICK</span>
          <span className={styles.and}>&</span>
          <span>MORTY</span>
        </h1>
        <p className={styles.subtitle}>База данных Рик и Морти</p>
      </div>

      <div className={styles.cards}>
        <Link to="/characters" className={`${styles.card} ${styles.characters}`}>
          <div className={styles.icon}>👽</div>
          <h2>Персонажи</h2>
        </Link>
        <Link to="/locations" className={`${styles.card} ${styles.locations}`}>
          <div className={styles.icon}>🌍</div>
          <h2>Локации</h2>
        </Link>
        <Link to="/episodes" className={`${styles.card} ${styles.episodes}`}>
          <div className={styles.icon}>📺</div>
          <h2>Эпизоды</h2>
        </Link>
      </div>
    </div>
  )
}
