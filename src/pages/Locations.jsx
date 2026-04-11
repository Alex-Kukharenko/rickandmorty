import { Link, useSearchParams } from 'react-router-dom'
import locations from '../data/location.json'
import './CategoryPage.css'

export function Locations() {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sort') || 'asc'

  const sorted = [...locations].sort((a, b) => {
    return sort === 'asc'
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  })

  return (
    <div className="category-page">
      <div className="category-header">
        <h1 className="category-title">Локации</h1>

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
        {sorted.map((loc) => (
          <Link to={`/locations/${loc.id}`} key={loc.created} className="card location-card">
            <div className="card-body">
              <h3 className="card-name">{loc.name}</h3>
              <span className="tag">{loc.type}</span>
              <div className="card-sub">{loc.dimension}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
