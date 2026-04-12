import { useParams } from 'react-router-dom'
import locations from '../data/location.json'
import { DetailPage } from './DetailPage/DetailPage'

export function LocationDetail() {
  const { id } = useParams()
  const loc = locations.find((l) => l.id === Number(id))

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
