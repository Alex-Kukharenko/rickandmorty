import { Link } from 'react-router-dom'
import './Home.css'

export function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1 className="home-title">
          <span>RICK</span>
          <span className="title-and">&</span>
          <span>MORTY</span>
        </h1>
        <p className="home-sub">База данных Рик и Морти</p>
      </div>

      <div className="home-cards">
        <Link to="/characters" className="home-card card-characters">
          <div className="card-icon">👽</div>
          <h2>Персонажи</h2>
        </Link>
        <Link to="/locations" className="home-card card-locations">
          <div className="card-icon">🌍</div>
          <h2>Локации</h2>
        </Link>
        <Link to="/episodes" className="home-card card-episodes">
          <div className="card-icon">📺</div>
          <h2>Эпизоды</h2>
        </Link>
      </div>
    </div>
  )
}
