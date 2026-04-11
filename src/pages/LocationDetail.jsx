import { useParams, useNavigate } from 'react-router-dom'
import locations from '../data/location.json'
import './DetailPage.css'

export function LocationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const loc = locations.find((l) => l.id === Number(id))

  if (!loc) return <div className="not-found">!!! Локация не найдена !!!</div>

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад к звездам!
      </button>
      <div className="detail-card">
        <div className="detail-info">
          <h1 className="detail-name">{loc.name}</h1>
          <div className="detail-fields">
            <div className="field">
              <span className="field-label">Тип</span>
              <span className="field-value cyan">{loc.type}</span>
            </div>
            <div className="field">
              <span className="field-label">Измерение</span>
              <span className="field-value">{loc.dimension}</span>
            </div>
            <div className="field">
              <span className="field-label">Создан</span>
              <span className="field-value">{new Date(loc.created).toLocaleDateString()}</span>
            </div>
            <div className="field">
              <span className="field-label">ID</span>
              <span className="field-value">#{loc.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
