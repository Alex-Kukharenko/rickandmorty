import { useParams } from 'react-router-dom'
import { Spinner } from '@components'
import { useFetch } from '@hooks'
import { DetailPage } from '@pages'
import { Alert } from '@mantine/core'

export function EpisodeDetail() {
  const { id } = useParams()
  const [loading, error, ep] = useFetch(
    `https://rickandmortyapi.com/api/episode/${id}`,
    null,
    (data) => data,
  )

  if (loading) return <Spinner />
  if (error) return <Alert color="red" title="Ошибка загрузки" />

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
