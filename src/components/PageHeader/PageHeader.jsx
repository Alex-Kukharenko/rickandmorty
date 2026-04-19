import { SortControl } from '../SortControl/SortControl'
import styles from './PageHeader.module.css'

export function PageHeader({ title, sort, onSort }) {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <SortControl sort={sort} onSort={onSort} />
    </div>
  )
}
