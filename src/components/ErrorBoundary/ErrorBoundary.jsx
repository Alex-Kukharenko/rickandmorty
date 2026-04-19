// components/ErrorBoundary/ErrorBoundary.jsx
import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error}>
          <h2 className={styles.title}>Что-то пошло не так 💥</h2>
          <p className={styles.message}>{this.state.error?.message}</p>
        </div>
      )
    }

    return this.props.children
  }
}
