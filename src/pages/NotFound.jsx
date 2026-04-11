import { Link } from 'react-router-dom'
import './NotFound.css'

export function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound-code">404</div>
      <h1>Неверное измерение</h1>
      <h2>!Страница не найдена!</h2>
      <p>Похоже, ты заблудился в мультивселенной.</p>
      <Link to="/" className="notfound-btn">
        Вернуться на главную
      </Link>
    </div>
  )
}
