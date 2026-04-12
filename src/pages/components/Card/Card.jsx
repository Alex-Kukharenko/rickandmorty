import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export const statusColor = (status) => {
  if (status === 'Alive') return styles.alive
  if (status === 'Dead') return styles.dead
  return styles.unknown
}

export function Card({ className, to, image, title, subtitle, meta, badge, icon }) {
  return (
    <Link className={`${className} ${styles.card}`} to={to}>
      {image && <img src={image} alt={title} className={styles.cardImg} />}

      {icon && <div className={styles.cardIcon}>{icon}</div>}

      {badge && <div className={styles.cardBadge}>{badge}</div>}

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {meta && <div className={styles.cardMeta}>{meta}</div>}
        {subtitle && subtitle !== '' && <div className={styles.cardSubtitle}>{subtitle}</div>}
      </div>
    </Link>
  )
}
