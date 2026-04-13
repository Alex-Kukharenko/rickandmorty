import { useSearchParams } from 'react-router-dom'
import characters from '../../data/characters.json'
import styles from './Characters.module.css'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Card, statusColor } from '../components/Card/Card'

export function Characters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sort') || 'asc'

  const sorted = [...characters].sort((a, b) => {
    return sort === 'asc'
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  })

  return (
    <div className={styles.wrapper}>
      <PageHeader
        title="Персонажи"
        sort={sort}
        onSort={(value) => setSearchParams({ sort: value })}
      />

      <div className={styles.grid}>
        {sorted.map((char) => (
          <Card
            key={char.id}
            to={`/characters/${char.id}`}
            image={char.image}
            title={char.name}
            subtitle={<p>Пол: {char.gender}</p>}
            meta={
              <>
                <p>
                  {' '}
                  <span className={`${styles.statusDot} ${statusColor(char.status)}`} />{' '}
                  {char.status}{' '}
                </p>
                <p>Вид: {char.species}</p>
                {char.type && <p>Тип: {char.type}</p>}
              </>
            }
          />
        ))}
      </div>
    </div>
  )
}
