import { Link, useSearchParams } from 'react-router-dom'
import characters from '../data/characters.json'
import './CategoryPage.css'

export function Characters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sort') || 'asc'

  const sorted = [...characters].sort((a, b) => {
    return sort === 'asc'
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  })

  const statusColor = (status) => {
    return status === 'Alive'
      ? 'status-alive'
      : status === 'Dead'
        ? 'status-dead'
        : 'status-unknown'
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">Персонажи</h1>
        <div className="sort-controls">
          <span className="sort-label">Сортировать по дате:</span>
          <button
            className="sort-btn active"
            onClick={() => setSearchParams({ sort: sort === 'asc' ? 'desc' : 'asc' })}
          >
            {sort === 'asc' ? 'ASC ↑' : 'DESC ↓'}
          </button>
        </div>
      </div>

      <div className="grid characters-grid">
        {sorted.map((char) => (
          <Link to={`/characters/${char.id}`} key={char.created} className="card character-card">
            <img src={char.image} alt={char.name} className="char-img" />

            <div className="card-body">
              <h3 className="card-name">{char.name}</h3>
              <div className="card-info">
                <p className={`status-dot ${statusColor(char.status)}`}></p>
                <p>Статус: {char.status}</p>
                <p>Вид: {char.species}</p>
                <p>Пол: {char.gender}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
