// pages/Login/Login.jsx
import { useState } from 'react'
import { Signin } from '../Signin/Signin'
import { Signup } from '../Signup/Signup'
import styles from './Login.module.css'
import { useAuth } from '../../context/authProvider'
import { useLocation, useNavigate } from 'react-router-dom'

export function Login() {
  const [tab, setTab] = useState('signin')
  const navigate = useNavigate()
  const auth = useAuth()
  const location = useLocation()
  const from = location.state?.from || '/'

  const handleSignin = (data) => {
    console.log('Signin:', data)
    /*  Запрос к серверу */
    const userEmail = data.email
    auth.signin(userEmail, () => {
      navigate(from, { replace: true })
    })
  }

  const handleSignup = (data) => {
    console.log('Signup:', data)
    /*  Запрос к серверу */
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginTabs}>
          <button
            className={`${styles.loginTab} ${tab === 'signin' ? styles.active : ''}`}
            onClick={() => setTab('signin')}
          >
            Войти
          </button>
          <button
            className={`${styles.loginTab} ${tab === 'signup' ? styles.active : ''}`}
            onClick={() => setTab('signup')}
          >
            Регистрация
          </button>
        </div>

        <div className={styles.loginContent}>
          {tab === 'signin' ? (
            <Signin onSubmit={handleSignin} />
          ) : (
            <Signup onSubmit={handleSignup} />
          )}
        </div>
      </div>
    </div>
  )
}
