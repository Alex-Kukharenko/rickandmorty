import styles from './TextInput.module.css'

const sizes = {
  xs: { height: 28, fontSize: 12, padding: '0 8px' },
  sm: { height: 32, fontSize: 13, padding: '0 10px' },
  md: { height: 36, fontSize: 14, padding: '0 12px' },
  lg: { height: 42, fontSize: 15, padding: '0 14px' },
  xl: { height: 50, fontSize: 16, padding: '0 16px' },
}

const radiuses = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
}

export function TextInput({
  name,
  label,
  description,
  error,
  required,
  withAsterisk,
  disabled,
  placeholder,
  type = 'text',
  value,
  onChange,
  size = 'md',
  radius = 'md',
  autoComplete,
}) {
  const sizeStyles = sizes[size] ?? sizes.md
  const borderRadius = typeof radius === 'number' ? radius : (radiuses[radius] ?? radiuses.md)

  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} style={{ fontSize: sizeStyles.fontSize - 1 }}>
          {label}
          {(required || withAsterisk) && <span className={styles.asterisk}>*</span>}
        </label>
      )}
      <input
        name={name}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        style={{
          height: sizeStyles.height,
          fontSize: sizeStyles.fontSize,
          padding: sizeStyles.padding,
          borderRadius,
        }}
      />
      {description && !error && (
        <span className={styles.description} style={{ fontSize: sizeStyles.fontSize - 2 }}>
          {description}
        </span>
      )}
      {error && (
        <span className={styles.error} style={{ fontSize: sizeStyles.fontSize - 2 }}>
          {error}
        </span>
      )}
    </div>
  )
}
