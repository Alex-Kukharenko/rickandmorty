import styles from './Spinner.module.css'

export function Spinner({ size = 'medium', text = 'Открываем портал...' }) {
  return (
    <div className={styles.container}>
      <div
        className={styles.spinner}
        style={{
          '--size': size === 'small' ? '40px' : size === 'large' ? '80px' : '60px',
        }}
      >
        <div className={styles.ring}></div>
        <div className={styles.glow}></div>
        <div className={styles.core}></div>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  )
}
