import { useParams } from 'react-router-dom'
import { statusColor } from '@components'
import { Spinner } from '@components'
import { useFetch } from '@hooks'
import { DetailPage } from '@pages'

import { Badge, Loader, Center, Alert } from '@mantine/core'

export function CharacterDetail() {
  const { id } = useParams()
  const [loading, error, char] = useFetch(
    `https://rickandmortyapi.com/api/character/${id}`,
    null,
    (data) => data,
  )

  if (loading) return <Spinner />
  if (error) return <Alert color="red" title="Ошибка загрузки" />

  return (
    <DetailPage
      notFoundText="Персонаж не найден!"
      card={
        char && {
          image: char.image,
          title: char.name,
          subtitle: <p>Пол: {char.gender}</p>,
          meta: (
            <>
              <Badge color={statusColor(char.status)} variant="dot" size="lg">
                {char.status}
              </Badge>
              <p>Вид: {char.species}</p>
              {char.type && <p>Тип: {char.type}</p>}
            </>
          ),
        }
      }
    />
  )
}

