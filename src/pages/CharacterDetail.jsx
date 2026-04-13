// CharacterDetail.jsx
import { useParams } from 'react-router-dom'
import characters from '../data/characters.json'
import { DetailPage } from './DetailPage/DetailPage'
import { statusColor } from './components/Card/Card'
import styles from './components/Card/Card.module.css'

export function CharacterDetail() {
  const { id } = useParams()
  const char = characters.find((c) => c.id === Number(id))

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
              <p>
                <span className={`${styles.statusDot} ${statusColor(char.status)}`} /> {char.status}
              </p>
              <p>Вид: {char.species}</p>
              {char.type && <p>Тип: {char.type}</p>}
            </>
          ),
        }
      }
    />
  )
}
