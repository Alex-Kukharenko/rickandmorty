import { useParams, useNavigate } from 'react-router-dom'
import episodes from '../data/episode.json'
import './DetailPage.css'

export function EpisodeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ep = episodes.find((e) => e.id === Number(id))

  if (!ep) return <div className="not-found">Episode not found</div>

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад к звезадм !!!
      </button>
      <div className="detail-card">
        <div className="detail-episode-code">{ep.episode}</div>
        <div className="detail-info">
          <h1 className="detail-name">{ep.name}</h1>

          <div className="detail-fields">
            <div className="field">
              <span className="field-label">Эпизод</span>
              <span className="field-value yellow">{ep.episode}</span>
            </div>

            <div className="field">
              <span className="field-label">Дата выхода</span>
              <span className="field-value">{ep.air_date}</span>
            </div>

            <div className="field">
              <span className="field-label">Создано</span>
              <span className="field-value">{new Date(ep.created).toLocaleDateString()}</span>
            </div>

            <div className="field">
              <span className="field-label">ID</span>
              <span className="field-value">#{ep.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
