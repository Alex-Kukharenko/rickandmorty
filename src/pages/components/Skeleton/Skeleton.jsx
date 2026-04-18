import styles from './Skeleton.module.css'

export function Skeleton({ count = 8 }) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.title}></div>
      </div>
      <div className={styles.grid}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.img} />
            <div className={styles.body}>
              <div className={styles.title} />
              <div className={styles.line} />
              <div className={styles.lineShort} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
