import { useParams } from 'react-router-dom'
import { Spinner } from '@components'
import { useFetch } from '@hooks'
import { DetailPage } from '@pages'
import { Alert } from '@mantine/core'

export function LocationDetail() {
  const { id } = useParams()
  const [loading, error, loc] = useFetch(
    `https://rickandmortyapi.com/api/location/${id}`,
    null,
    (data) => data,
  )

  if (loading) return <Spinner />
  if (error) return <Alert color="red" title="Ошибка загрузки" />

  return (
    <DetailPage
      notFoundText="Локация не найдена!"
      card={
        loc && {
          icon: '🌍',
          title: loc.name,
          subtitle: <p>Тип: {loc.type}</p>,
          meta: (
            <>
              <p>Измерение: {loc.dimension}</p>
              <p>Создано: {new Date(loc.created).toLocaleDateString('ru-RU')}</p>
            </>
          ),
        }
      }
    />
  )
}
