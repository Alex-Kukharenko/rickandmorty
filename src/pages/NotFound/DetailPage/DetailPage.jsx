import { useNavigate } from 'react-router-dom'
import { Card } from '../Card/Card'
import styles from './DetailPage.module.css'

export function DetailPage({ card, notFoundText = 'Не найдено' }) {
  const navigate = useNavigate()

  if (!card) return <div className={styles.notFound}>{notFoundText}</div>

  return (
    <div className={styles.detailPage}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Назад к звёздам
      </button>
      <Card {...card} />
    </div>
  )
}
