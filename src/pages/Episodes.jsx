import { Link, useSearchParams } from 'react-router-dom'
import episodes from '../data/episode.json'
import './CategoryPage.css'

export function Episodes() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sort = searchParams.get('sort') || 'asc'

  const sorted = [...episodes].sort((a, b) => {
    return sort === 'asc'
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  })

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">Эпизоды:</h1>
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

      <div className="grid">
        {sorted.map((ep) => (
          <Link to={`/episodes/${ep.id}`} key={ep.id} className="card episode-card">
            <div className="episode-code">{ep.episode}</div>
            <div className="card-body">
              <h3 className="card-name">{ep.name}</h3>
              <div className="card-sub">{ep.air_date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
