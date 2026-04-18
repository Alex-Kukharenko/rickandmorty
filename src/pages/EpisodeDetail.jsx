import { useParams } from 'react-router-dom'
import episodes from '../data/episode.json'
import { DetailPage } from './DetailPage/DetailPage'

export function EpisodeDetail() {
  const { id } = useParams()
  const ep = episodes.find((e) => e.id === Number(id))

  return (
    <DetailPage
      notFoundText="Эпизод не найден!"
      card={
        ep && {
          badge: ep.episode,
          title: ep.name,
          meta: (
            <>
              <p>Дата выхода: {ep.air_date}</p>
              <p>Создано: {new Date(ep.created).toLocaleDateString('ru-RU')}</p>
              <p>ID: #{ep.id}</p>
            </>
          ),
        }
      }
    />
  )
}

