import { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import styles from './Signin.module.css'

export function Signin({ onSubmit }) {
  const [errors, setErrors] = useState({})

  const validate = (data) => {
    const e = {}
    if (!data.email) e.email = 'Введите email'
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Некорректный email'
    if (!data.password) e.password = 'Введите пароль'
    else if (data.password.length < 8) e.password = 'Минимум 8 символов'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    const errs = validate(data)
    setErrors(errs)
    if (!Object.keys(errs).length) onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <TextInput
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
        withAsterisk
        error={errors.email}
      />
      <TextInput
        label="Пароль"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="••••••••"
        withAsterisk
        description="Минимум 8 символов"
        error={errors.password}
      />
      <button className={styles.button} type="submit">
        Войти
      </button>
    </form>
  )
}
