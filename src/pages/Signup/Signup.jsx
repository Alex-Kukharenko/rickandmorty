// Signup.jsx
import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import styles from './Signup.module.css'

export function Signup({ onSubmit }) {
  const [errors, setErrors] = useState({})

  const validate = (data) => {
    const e = {}
    if (!data.name) e.name = 'Введите имя'
    if (!data.username) e.username = 'Введите ник'
    else if (data.username.length < 3) e.username = 'Минимум 3 символа'
    if (!data.email) e.email = 'Введите email'
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Некорректный email'
    if (!data.gender) e.gender = 'Выберите пол'
    if (!data.password) e.password = 'Введите пароль'
    else if (data.password.length < 8) e.password = 'Минимум 8 символов'
    if (!data.confirm) e.confirm = 'Повторите пароль'
    else if (data.confirm !== data.password) e.confirm = 'Пароли не совпадают'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const errs = validate(data)
    setErrors(errs)
    if (!Object.keys(errs).length) {
      const { confirm: _confirm, ...result } = data
      onSubmit?.(result)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextInput
        label="Имя"
        name="name"
        autoComplete="name"
        placeholder="Иван Иванов"
        withAsterisk
        error={errors.name}
      />
      <TextInput
        label="Ник"
        name="username"
        autoComplete="username"
        placeholder="ivan_99"
        withAsterisk
        description="Латиница, цифры, нижнее подчёркивание"
        error={errors.username}
      />
      <TextInput
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        withAsterisk
        error={errors.email}
      />

      <div className={styles.radioField}>
        <span className={styles.radioLabel}>
          Пол <span className={styles.asterisk}>*</span>
        </span>
        <div className={styles.radioGroup}>
          {[
            ['male', 'Мужской'],
            ['female', 'Женский'],
            ['other', 'Другой'],
          ].map(([val, lbl]) => (
            <label key={val} className={styles.radioOption}>
              <input type="radio" name="gender" value={val} />
              {lbl}
            </label>
          ))}
        </div>
        {errors.gender && <span className={styles.error}>{errors.gender}</span>}
      </div>

      <TextInput
        label="Пароль"
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="••••••••"
        withAsterisk
        description="Минимум 8 символов"
        error={errors.password}
      />
      <TextInput
        label="Повторить пароль"
        type="password"
        name="confirm"
        autoComplete="new-password"
        placeholder="••••••••"
        withAsterisk
        error={errors.confirm}
      />

      <button className={styles.button} type="submit">
        Зарегистрироваться
      </button>
    </form>
  )
}
