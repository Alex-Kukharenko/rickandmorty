import { useParams, useNavigate } from 'react-router-dom'
import characters from '../data/characters.json'
import './DetailPage.css'

export function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const char = characters.find((c) => c.id === Number(id))

  if (!char) return <div className="not-found">Персонаж не найден!</div>

  const statusColor =
    char.status === 'Alive'
      ? 'status-alive'
      : char.status === 'Dead'
        ? 'status-dead'
        : 'status-unknown'

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Назад к звездам
      </button>

      <div className="detail-card character-detail">
        <img src={char.image} alt={char.name} className="detail-img" />

        <div className="detail-info">
          <h1 className="detail-name">{char.name}</h1>

          <div className="detail-status">
            <span className={`status-dot ${statusColor}`} />
            <span>{char.status}</span>
          </div>

          <div className="detail-fields">
            <div className="field">
              <span className="field-label">Вид</span>
              <span className="field-value">{char.species}</span>
            </div>
            {char.type && (
              <div className="field">
                <span className="field-label">Тип</span>
                <span className="field-value">{char.type}</span>
              </div>
            )}
            <div className="field">
              <span className="field-label">Пол</span>
              <span className="field-value">{char.gender}</span>
            </div>
            <div className="field">
              <span className="field-label">Создан</span>
              <span className="field-value">{new Date(char.created).toLocaleDateString()}</span>
            </div>
            <div className="field">
              <span className="field-label">ID</span>
              <span className="field-value">#{char.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
