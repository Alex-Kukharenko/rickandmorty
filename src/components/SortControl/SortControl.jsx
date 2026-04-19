// components/SortControl.jsx
import styles from './SortControl.module.css'

export function SortControl({ sort, onSort }) {
  return (
    <div className={styles.sortControls}>
      <span className={styles.sortLabel}>Сортировать по дате:</span>
      <button
        className={`${styles.sortBtn} ${styles.active}`}
        onClick={() => onSort(sort === 'asc' ? 'desc' : 'asc')}
      >
        {sort === 'asc' ? 'ASC ↑' : 'DESC ↓'}
      </button>
    </div>
  )
}
